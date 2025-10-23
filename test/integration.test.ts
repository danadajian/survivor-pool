import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mock,
  mock,
} from "bun:test";
import { and, eq } from "drizzle-orm";

import { updateResults } from "../scripts/update-results/update-results";
import { db } from "../src/db";
import { createPool } from "../src/pages/create/backend";
import { deletePool } from "../src/pages/home/backend";
import { joinPool } from "../src/pages/join/backend";
import { fetchPicksForPoolWithGamesResponse } from "../src/pages/picks/backend";
import { fetchPicksDataForUser } from "../src/pages/pool/backend/fetch-picks-data-for-user";
import { findPoolWinner } from "../src/pages/pool/backend/find-pool-winner";
import { makePick } from "../src/pages/pool/backend/make-pick";
import { reactivatePool } from "../src/pages/pool/backend/reactivate-pool";
import { userIsEliminated } from "../src/pages/pool/backend/user-is-eliminated";
import { members, picks, pools } from "../src/schema";
import { Events } from "../src/utils/fetch-current-games";

async function clearAllTables() {
  await db.delete(picks);
  await db.delete(pools);
  await db.delete(members);
}

describe("feature tests", () => {
  beforeAll(async () => {
    global.fetch = mock() as Mock<typeof fetch> & {
      preconnect: typeof fetch.preconnect;
    }; // prevent any network calls during tests

    Bun.spawnSync(["bun", "drizzle"]);
    await clearAllTables();
  });

  afterAll(async () => {
    await clearAllTables();
  });

  const user1 = "user1@test.com";
  const user2 = "user2@test.com";
  const user3 = "user3@test.com";
  const season = 2023;

  it("should create a new pool", async () => {
    await createPool({ poolName: "Test Pool", username: user1 });
    const result = await db.select().from(pools);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toEqual("Test Pool");
    expect(result[0]?.creator).toEqual(user1);
  });

  it("should have added the creator as a member", async () => {
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(1);
    expect(newMembers[0]?.username).toEqual(user1);
  });

  it("should not return poolWinner when no picks have been made yet", async () => {
    const poolId = await getPoolId();
    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    const poolWinner = await findPoolWinner(poolId, 1, picksForPoolAndSeason);
    expect(poolWinner).toBeUndefined();
  });

  it("should allow other users to join the pool", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();
    await joinPool({ username: user2, poolId: pool.id });
    await joinPool({ username: user3, poolId: pool.id });
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(3);
    expect(newMembers[0]?.username).toEqual(user1);
    expect(newMembers[1]?.username).toEqual(user2);
    expect(newMembers[2]?.username).toEqual(user3);
  });

  it("should allow users to make a pick", async () => {
    const poolId = await getPoolId();
    await makePick({
      username: user1,
      teamPicked: "Giants",
      week: 1,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: "49ers",
      week: 1,
      season,
      poolId,
      pickIsSecret: true,
    });
    const { userPick: user1Pick } = await fetchPicksDataForUser({
      username: user1,
      week: 1,
      season,
      poolId,
    });
    expect(user1Pick?.username).toEqual(user1);
    expect(user1Pick?.week).toEqual(1);
    expect(user1Pick?.season).toEqual(season);
    expect(user1Pick?.poolId).toEqual(poolId);
    expect(user1Pick?.teamPicked).toEqual("Giants");
    const { userPick: user2Pick } = await fetchPicksDataForUser({
      username: user2,
      week: 1,
      season,
      poolId,
    });
    expect(user2Pick?.username).toEqual(user2);
    expect(user2Pick?.week).toEqual(1);
    expect(user2Pick?.season).toEqual(season);
    expect(user2Pick?.poolId).toEqual(poolId);
    expect(user2Pick?.teamPicked).toEqual("49ers");
  });

  it("should return secret picks before the game starts", async () => {
    const poolId = await getPoolId();
    const mockEvents = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "49ers" },
              },
            ],
            status: {
              type: {
                name: "STATUS_SCHEDULED",
              },
            },
          },
        ],
      },
    ] as Events;
    const { picks } = await fetchPicksForPoolWithGamesResponse({
      poolId,
      week: 1,
      season,
      gamesResponse: {
        week: { number: 1 },
        season: { year: season },
        events: mockEvents,
      },
    });
    const secretPick = picks.find((pick) => pick.pickIsSecret);
    expect(secretPick?.username).toEqual(user2);
    expect(secretPick?.result).toEqual("PENDING");
    expect(secretPick?.teamPicked).toEqual("SECRET");
  });

  it("should have no forbidden picks this week", async () => {
    const poolId = await getPoolId();
    const { forbiddenTeams: user1ForbiddenTeams } = await fetchPicksDataForUser(
      {
        username: user1,
        week: 1,
        season,
        poolId,
      },
    );
    expect(user1ForbiddenTeams).toBeEmpty();
    const { forbiddenTeams: user2ForbiddenTeams } = await fetchPicksDataForUser(
      {
        username: user2,
        week: 1,
        season,
        poolId,
      },
    );
    expect(user2ForbiddenTeams).toBeEmpty();
  });

  it("should update results to pending when no results yet", async () => {
    const poolId = await getPoolId();
    const eventsWithPendingResult = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "Giants" },
              },
              {
                team: { name: "49ers" },
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(eventsWithPendingResult, 1, season);
    const userPicks = await db.query.picks.findMany({
      where: and(eq(picks.week, 1), eq(picks.season, season)),
    });
    expect(userPicks.every((pick) => pick.result === "PENDING")).toBeTrue();
    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    expect(
      userIsEliminated({
        username: user1,
        currentWeek: 1,
        picksForPoolAndSeason,
      }),
    ).toBeFalse();
    expect(
      userIsEliminated({
        username: user2,
        currentWeek: 1,
        picksForPoolAndSeason,
      }),
    ).toBeFalse();
  });

  it("should update results when team picked wins", async () => {
    const poolId = await getPoolId();
    const eventsWithWinningResult = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "Giants" },
                winner: true,
              },
              {
                team: { name: "49ers" },
                winner: true,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(eventsWithWinningResult, 1, season);
    const userPick1 = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user1),
        eq(picks.week, 1),
        eq(picks.season, season),
      ),
    });
    expect(userPick1?.result).toEqual("WON");

    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    expect(
      userIsEliminated({
        username: user1,
        currentWeek: 1,
        picksForPoolAndSeason,
      }),
    ).toBeFalse();

    const userPick2 = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user2),
        eq(picks.week, 1),
        eq(picks.season, season),
      ),
    });
    expect(userPick2?.result).toEqual("WON");
    expect(
      userIsEliminated({
        username: user2,
        currentWeek: 1,
        picksForPoolAndSeason,
      }),
    ).toBeFalse();
  });

  it("should make picks not secret once game started", async () => {
    const poolId = await getPoolId();
    const mockEvents = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "49ers" },
              },
            ],
            status: {
              type: {
                name: "STATUS_IN_PROGRESS",
              },
            },
          },
        ],
      },
    ] as Events;
    const { picks } = await fetchPicksForPoolWithGamesResponse({
      poolId,
      week: 1,
      season,
      gamesResponse: {
        week: { number: 1 },
        season: { year: season },
        events: mockEvents,
      },
    });
    const secretPick = picks.find((pick) => pick.pickIsSecret);
    expect(secretPick?.username).toEqual(user2);
    expect(secretPick?.result).toEqual("WON");
    expect(secretPick?.teamPicked).toEqual("49ers");
  });

  it("should eliminate users who fail to make a pick the week before", async () => {
    const poolId = await getPoolId();
    const events = [
      {
        competitions: [
          {
            competitors: [{}],
          },
        ],
      },
    ] as Events;
    await updateResults(events, 2, season);

    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    expect(
      userIsEliminated({
        username: user3,
        currentWeek: 2,
        picksForPoolAndSeason,
      }),
    ).toBeTrue();
  });

  it("should make teams picked forbidden next week", async () => {
    const poolId = await getPoolId();
    const { forbiddenTeams: user1ForbiddenTeams } = await fetchPicksDataForUser(
      {
        username: user1,
        week: 2,
        season,
        poolId,
      },
    );
    expect(user1ForbiddenTeams).toEqual(["Giants"]);
    const { forbiddenTeams: user2ForbiddenTeams } = await fetchPicksDataForUser(
      {
        username: user2,
        week: 2,
        season,
        poolId,
      },
    );
    expect(user2ForbiddenTeams).toEqual(["49ers"]);
  });

  it("should not return poolWinner when no one has won the pool yet", async () => {
    const poolId = await getPoolId();
    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    const poolWinner = await findPoolWinner(poolId, 1, picksForPoolAndSeason);
    expect(poolWinner).toBeUndefined();
  });

  it("should not eliminate anyone when everyone loses", async () => {
    const poolId = await getPoolId();
    const winningTeam = "Giants";
    const losingTeam = "Cowboys";
    await makePick({
      username: user1,
      teamPicked: losingTeam,
      week: 2,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: losingTeam,
      week: 2,
      season,
      poolId,
    });

    const events = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: winningTeam },
                winner: true,
              },
              {
                team: { name: losingTeam },
                winner: false,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(events, 2, season);
    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    expect(
      userIsEliminated({
        username: user1,
        currentWeek: 2,
        picksForPoolAndSeason,
      }),
    ).toBeFalse();
    expect(
      userIsEliminated({
        username: user2,
        currentWeek: 2,
        picksForPoolAndSeason,
      }),
    ).toBeFalse();
  });

  it("should eliminate user when team picked loses or ties", async () => {
    const poolId = await getPoolId();
    const tyingTeam1 = "Giants";
    const tyingTeam2 = "Cowboys";
    const winningTeam = "49ers";
    const losingTeam = "Rams";
    await makePick({
      username: user1,
      teamPicked: winningTeam,
      week: 3,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: tyingTeam1,
      week: 3,
      season,
      poolId,
    });

    const eventsWithTie = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: tyingTeam1 },
                winner: false,
              },
              {
                team: { name: tyingTeam2 },
                winner: false,
              },
            ],
          },
        ],
      },
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: winningTeam },
                winner: true,
              },
              {
                team: { name: losingTeam },
                winner: false,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(eventsWithTie, 3, season);

    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    expect(
      userIsEliminated({
        username: user2,
        currentWeek: 3,
        picksForPoolAndSeason,
      }),
    ).toBeTrue();
  });

  it("should return poolWinner when someone has won the pool", async () => {
    const poolId = await getPoolId();
    const picksForPoolAndSeason = await db.query.picks.findMany({
      where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
    });
    const poolWinner = await findPoolWinner(poolId, 3, picksForPoolAndSeason);
    expect(poolWinner?.username).toEqual(user1);
    const poolWinnerNextWeek = await findPoolWinner(
      poolId,
      4,
      picksForPoolAndSeason,
    );
    expect(poolWinnerNextWeek?.username).toEqual(user1);
  });

  it("should reactivate the pool and delete all picks for current season", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();

    await reactivatePool({ poolId: pool.id, season });

    const userPicks = await db.query.picks.findMany({
      where: and(eq(picks.poolId, pool.id), eq(picks.season, season)),
    });
    expect(userPicks).toBeEmpty();
  });

  it("should delete the pool", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();

    await deletePool({ poolId: pool.id });
    const pools = await db.query.pools.findMany();
    expect(pools.length).toEqual(0);
  });
});

async function getPoolId() {
  const pool = await db.query.pools.findFirst();
  if (!pool) throw new Error();
  return pool.id;
}
