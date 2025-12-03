import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mock,
  mock,
} from "bun:test";
import { and, desc, eq } from "drizzle-orm";

import { updateResults } from "../scripts/update-results/update-results";
import { db } from "../src/db";
import { createPool } from "../src/pages/create/backend";
import { editPool } from "../src/pages/edit/backend";
import { deletePool } from "../src/pages/home/backend";
import { getPool, joinPool } from "../src/pages/join/backend";
import {
  fetchPicks,
  fetchPicksForWeek,
  fetchPoolMembers,
} from "../src/pages/pool/backend";
import { findPoolWinner } from "../src/pages/pool/backend/find-pool-winner";
import { makePick } from "../src/pages/pool/backend/make-pick";
import { reactivatePool } from "../src/pages/pool/backend/reactivate-pool";
import { userEliminationStatus } from "../src/pages/pool/backend/user-elimination-status";
import { fetchPoolWinners } from "../src/pages/winners/backend";
import { members, picks, pools } from "../src/schema";
import { Events, GamesResponse } from "../src/utils/fetch-current-games";
import { mockEspnResponse } from "./mocks";

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
    mockGamesResponse({
      currentGameDate: "Week 1",
      currentSeason: season,
      events: [],
    });
    await createPool({ poolName: "Test Pool", username: user1 });
    const result = await db.select().from(pools);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toEqual("Test Pool");
    expect(result[0]?.creator).toEqual(user1);
    expect(result[0]?.poolStart).toEqual("Week 1");
  });

  it("should have added the creator as a member", async () => {
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(1);
    expect(newMembers[0]?.username).toEqual(user1);
  });

  it("should not return poolWinner when no picks have been made yet", async () => {
    const poolId = await getPoolId();
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(poolWinner).toBeUndefined();

    const pool = await db.query.pools.findFirst({
      where: eq(pools.id, poolId),
    });
    expect(pool?.poolWinner).toBeNull();
  });

  it("should allow other users to join the pool", async () => {
    const poolId = await getPoolId();
    await joinPool({ username: user2, poolId });
    await joinPool({ username: user3, poolId });
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
      pickDate: "Week 1",
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: "49ers",
      pickDate: "Week 1",
      season,
      poolId,
      pickIsSecret: true,
    });
    const user1Pick = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user1),
        eq(picks.pickDate, "Week 1"),
        eq(picks.poolId, poolId),
        eq(picks.season, season),
      ),
    });
    expect(user1Pick?.username).toEqual(user1);
    expect(user1Pick?.pickDate).toEqual("Week 1");
    expect(user1Pick?.season).toEqual(season);
    expect(user1Pick?.poolId).toEqual(poolId);
    expect(user1Pick?.teamPicked).toEqual("Giants");
    const user2Pick = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user2),
        eq(picks.pickDate, "Week 1"),
        eq(picks.poolId, poolId),
        eq(picks.season, season),
      ),
    });
    expect(user2Pick?.username).toEqual(user2);
    expect(user2Pick?.pickDate).toEqual("Week 1");
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
    mockGamesResponse({
      currentGameDate: "Week 1",
      currentSeason: season,
      events: mockEvents,
    });
    const picks = await fetchPicksForWeek({
      poolId,
      pickDate: "Week 1",
      season,
    });
    const secretPick = picks.find(
      (pick: (typeof picks)[number]) => pick.pickIsSecret,
    );
    expect(secretPick?.username).toEqual(user2);
    expect(secretPick?.result).toEqual("PENDING");
    expect(secretPick?.teamPicked).toEqual("SECRET");
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
    await updateResults(eventsWithPendingResult, "NFL", "Week 1", season);
    const userPicks = await db.query.picks.findMany({
      where: and(eq(picks.pickDate, "Week 1"), eq(picks.season, season)),
    });
    expect(userPicks.every((pick) => pick.result === "PENDING")).toBeTrue();
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user1,
        picksForPoolAndSeason,
        lives: 1,
        events: eventsWithPendingResult,
      }).eliminated,
    ).toBeFalse();
    expect(
      userEliminationStatus({
        username: user2,
        picksForPoolAndSeason,
        lives: 1,
        events: eventsWithPendingResult,
      }).eliminated,
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
                team: { name: "Eagles" },
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
                team: { name: "Cardinals" },
                winner: false,
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
    await updateResults(eventsWithWinningResult, "NFL", "Week 1", season);
    const userPick1 = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user1),
        eq(picks.pickDate, "Week 1"),
        eq(picks.season, season),
      ),
    });
    expect(userPick1?.result).toEqual("WON");

    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user1,
        picksForPoolAndSeason,
        lives: 1,
        events: eventsWithWinningResult,
      }).eliminated,
    ).toBeFalse();

    const userPick2 = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user2),
        eq(picks.pickDate, "Week 1"),
        eq(picks.season, season),
      ),
    });
    expect(userPick2?.result).toEqual("WON");
    expect(
      userEliminationStatus({
        username: user2,
        picksForPoolAndSeason,
        lives: 1,
        events: eventsWithWinningResult,
      }).eliminated,
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
    mockGamesResponse({
      currentGameDate: "Week 1",
      currentSeason: season,
      events: mockEvents,
    });
    const picks = await fetchPicksForWeek({
      poolId,
      pickDate: "Week 1",
      season,
    });
    const secretPick = picks.find(
      (pick: (typeof picks)[number]) => pick.pickIsSecret,
    );
    expect(secretPick?.username).toEqual(user2);
    expect(secretPick?.result).toEqual("WON");
    expect(secretPick?.teamPicked).toEqual("49ers");
  });

  it("should eliminate users who fail to make a pick the round before", async () => {
    const poolId = await getPoolId();
    const events = mockEspnResponse.events as Events;
    await updateResults(events, "NFL", "Week 2", season);

    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user3,
        picksForPoolAndSeason,
        lives: 1,
        events,
      }).eliminated,
    ).toBeTrue();
  });

  it("should not return poolWinner when no one has won the pool yet", async () => {
    const poolId = await getPoolId();
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(poolWinner).toBeUndefined();
  });

  it("should not eliminate anyone when everyone loses", async () => {
    const poolId = await getPoolId();
    const winningTeam = "Giants";
    const losingTeam = "Cowboys";
    await makePick({
      username: user1,
      teamPicked: losingTeam,
      pickDate: "Week 2",
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: losingTeam,
      pickDate: "Week 2",
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
          ...mockEspnResponse.events.flatMap((event) => event.competitions[0]),
        ],
      },
    ] as Events;
    await updateResults(events, "NFL", "Week 2", season);
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user1,
        picksForPoolAndSeason,
        lives: 1,
        events,
      }).eliminated,
    ).toBeFalse();
    expect(
      userEliminationStatus({
        username: user2,
        picksForPoolAndSeason,
        lives: 1,
        events,
      }).eliminated,
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
      pickDate: "Week 3",
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: tyingTeam1,
      pickDate: "Week 3",
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
    await updateResults(eventsWithTie, "NFL", "Week 3", season);

    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user2,
        picksForPoolAndSeason,
        lives: 1,
        events: eventsWithTie,
      }).eliminated,
    ).toBeTrue();
  });

  it("should return poolWinner when someone has won the pool", async () => {
    const poolId = await getPoolId();
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(poolWinner?.username).toEqual(user1);
    const poolWinnerNextWeek = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 1,
      events: mockEspnResponse.events as Events,
    });
    expect(poolWinnerNextWeek?.username).toEqual(user1);
  });

  it("should set poolWinner field in pools table when updateResults finds a winner", async () => {
    const poolId = await getPoolId();

    const events = mockEspnResponse.events as Events;
    await updateResults(events, "NFL", "Week 3", season);

    const pool = await db.query.pools.findFirst({
      where: eq(pools.id, poolId),
    });
    expect(pool?.poolWinner).toEqual(user1);
  });

  it("should reactivate the pool by creating a new pool and adding all members", async () => {
    const currentWeek = 4;
    mockGamesResponse({
      currentGameDate: `Week ${currentWeek}`,
      currentSeason: season,
      events: [],
    });
    const oldPoolId = await getPoolId();
    const newPool = await reactivatePool({ poolId: oldPoolId, sport: "NFL" });
    if (!newPool) throw new Error();
    const oldPool = await getPool({ poolId: oldPoolId });
    expect(oldPool?.poolStart).toEqual("Week 1");
    expect(oldPool?.poolEnd).toEqual(`Week ${currentWeek}`);
    expect(newPool?.poolStart).toEqual(`Week ${currentWeek}`);
    expect(newPool?.poolEnd).toEqual(null);
    const oldPoolMembers = await db.query.members.findMany({
      where: eq(members.poolId, oldPoolId),
    });
    const newPoolMembers = await db.query.members.findMany({
      where: eq(members.poolId, newPool.id),
    });
    expect(oldPoolMembers.length).toEqual(newPoolMembers.length);
  });

  it("should fetch previous pool winners for a user", async () => {
    const { seasons, winners } = await fetchPoolWinners({ username: user1 });
    expect(seasons).toContain(season);
    const seasonWinners = winners.filter((winner) => winner.season === season);
    expect(seasonWinners).not.toHaveLength(0);
    const testPoolWinner = seasonWinners.find(
      (winner) => winner.poolName === "Test Pool",
    );
    expect(testPoolWinner?.winner).toEqual(user1);
    expect(testPoolWinner?.poolStart).toEqual("Week 1");
    expect(testPoolWinner?.poolEnd).toEqual("Week 4");
  });

  it("should edit the pool to add multiple lives", async () => {
    const poolId = await getPoolId();
    const [updatedPoolResult] = await editPool({
      poolId,
      poolName: "Test Pool",
      lives: 2,
      sport: "NFL",
    });
    expect(updatedPoolResult?.lives).toEqual(2);
  });

  it("should not eliminate user with 2 lives after 1 loss", async () => {
    const poolId = await getPoolId();
    const currentWeek = "Week 4";
    await makePick({
      username: user1,
      teamPicked: "49ers",
      pickDate: currentWeek,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: "Giants",
      pickDate: currentWeek,
      season,
      poolId,
    });
    const events = [
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
                winner: false,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(events, "NFL", currentWeek, season);
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user1,
        picksForPoolAndSeason,
        lives: 2,
        events,
      }).eliminated,
    ).toBeFalse();
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 2,
      events,
    });
    expect(poolWinner).toBeUndefined();
  });

  it("should not declare pool winner until all picks are completed", async () => {
    const poolId = await getPoolId();
    const currentWeek = "Week 5";
    await makePick({
      username: user1,
      teamPicked: "Patriots",
      pickDate: currentWeek,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: "Dolphins",
      pickDate: currentWeek,
      season,
      poolId,
    });
    const events = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "Dolphins" },
              },
              {
                team: { name: "Patriots" },
                winner: false,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(events, "NFL", currentWeek, season);
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user1,
        picksForPoolAndSeason,
        lives: 2,
        events,
      }).eliminated,
    ).toBeFalse();
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 2,
      events,
    });
    expect(poolWinner).toBeUndefined();
  });

  it("should eliminate user with 2 lives after 2 losses and declare pool winner", async () => {
    const poolId = await getPoolId();
    const currentWeek = "Week 5";
    const events = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "Dolphins" },
                winner: true,
              },
              {
                team: { name: "Patriots" },
                winner: false,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(events, "NFL", currentWeek, season);
    const picksForPoolAndSeason = await fetchPicks(poolId, season);
    expect(
      userEliminationStatus({
        username: user1,
        picksForPoolAndSeason,
        lives: 2,
        events,
      }).eliminated,
    ).toBeTrue();
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner({
      picksForPoolAndSeason,
      poolMembers,
      lives: 2,
      events,
    });
    expect(poolWinner?.username).toEqual(user2);
  });

  it("should delete a pool", async () => {
    const poolId = await getPoolId();
    await deletePool({ poolId });

    const poolsResult = await db.query.pools.findMany({
      where: eq(pools.id, poolId),
    });
    expect(poolsResult.length).toEqual(0);

    const picksAfter = await db.query.picks.findMany({
      where: eq(picks.poolId, poolId),
    });
    expect(picksAfter.length).toEqual(0);

    const membersAfter = await db.query.members.findMany({
      where: eq(members.poolId, poolId),
    });
    expect(membersAfter.length).toEqual(0);
  });
});

async function getPoolId() {
  const pool = await db.query.pools.findFirst({
    orderBy: desc(pools.createdAt),
  });
  if (!pool) throw new Error();
  return pool.id;
}

function mockGamesResponse(response: GamesResponse) {
  mock.module("../src/utils/fetch-current-games", () => ({
    fetchCurrentGames: mock(async () => response),
  }));
}
