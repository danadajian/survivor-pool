import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { and, eq, or } from "drizzle-orm";

import { updateResults } from "../scripts/update-results/update-results";
import { db } from "../src/db";
import { createPool } from "../src/pages/create/backend";
import { joinPool } from "../src/pages/join/backend";
import { fetchPicksForPool } from "../src/pages/picks/backend";
import {
  deletePool,
  Events,
  fetchPicksDataForUser,
  fetchPoolMembers,
  findPoolWinner,
  makePick,
  reactivatePool,
} from "../src/pages/pool/backend";
import { members, picks, pools } from "../src/schema";

async function clearAllTables() {
  await db.delete(picks);
  await db.delete(pools);
  await db.delete(members);
}

describe("feature tests", () => {
  beforeAll(async () => {
    Bun.spawnSync(["bun", "drizzle"]);
    await clearAllTables();
  });

  afterAll(async () => {
    await clearAllTables();
    process.exit(0);
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

  it("should not return poolWinner when only one person is in the pool", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();

    const poolMembers = await fetchPoolMembers(pool.id);
    const poolWinner = await findPoolWinner(poolMembers);
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

    const { picks } = await fetchPicksForPool({
      poolId,
      week: 1,
      season,
    });
    const secretPick = picks.find((pick) => pick.pickIsSecret);
    expect(secretPick?.username).toEqual(user2);
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
    expect(user1ForbiddenTeams).toBeUndefined();
    const { forbiddenTeams: user2ForbiddenTeams } = await fetchPicksDataForUser(
      {
        username: user2,
        week: 1,
        season,
        poolId,
      },
    );
    expect(user2ForbiddenTeams).toBeUndefined();
  });

  it("should update results to pending when no results yet", async () => {
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
    const eliminatedMembers = await db.query.members.findFirst({
      where: eq(members.eliminated, true),
    });
    expect(eliminatedMembers).toBeEmpty();
  });

  it("should update results when team picked wins", async () => {
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
    const membersResult1 = await db.query.members.findFirst({
      where: eq(members.username, user1),
    });
    expect(membersResult1?.eliminated).toBeFalse();
    const userPick2 = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user2),
        eq(picks.week, 1),
        eq(picks.season, season),
      ),
    });
    expect(userPick2?.result).toEqual("WON");
    const membersResult2 = await db.query.members.findFirst({
      where: eq(members.username, user2),
    });
    expect(membersResult2?.eliminated).toBeFalse();
  });

  it("should eliminate users who fail to make a pick the week before", async () => {
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
    const membersResult3 = await db.query.members.findFirst({
      where: eq(members.username, user3),
    });
    expect(membersResult3?.eliminated).toBeTrue();
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
    const results = await db.query.members.findMany();
    if (!results[0]) throw new Error();
    const poolId = results[0].poolId;

    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner(poolMembers);
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
    const membersLeft = await db.query.members.findMany({
      where: or(eq(members.username, user1), eq(members.username, user2)),
    });
    expect(membersLeft[0].username).toEqual(user1);
    expect(membersLeft[0].eliminated).toBeFalse();
    expect(membersLeft[1].username).toEqual(user2);
    expect(membersLeft[1].eliminated).toBeFalse();
  });

  it("should not eliminate user when a tie is picked", async () => {
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
    const user2Member = await db.query.members.findFirst({
      where: eq(members.username, user2),
    });
    expect(user2Member?.username).toEqual(user2);
    expect(user2Member?.eliminated).toBeFalse();
  });

  it("should eliminate user when team picked loses", async () => {
    const poolId = await getPoolId();

    await makePick({
      username: user2,
      teamPicked: "Bengals",
      week: 3,
      season,
      poolId,
    });

    // scenario for changing pick with tied pick
    const losingTeam = "Eagles";
    await makePick({
      username: user2,
      teamPicked: losingTeam,
      week: 3,
      season,
      poolId,
    });

    const user2Picks = await db.query.picks.findMany({
      where: and(
        eq(picks.poolId, poolId),
        eq(picks.username, user2),
        eq(picks.week, 3),
        eq(picks.season, season),
      ),
    });
    expect(user2Picks).toHaveLength(2);

    const eventsWithLosingResult = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "Giants" },
                winner: false,
              },
              {
                team: { name: "Cowboys" },
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
                team: { name: "49ers" },
                winner: true,
              },
              {
                team: { name: "Rams" },
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
                team: { name: "Chiefs" },
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
    await updateResults(eventsWithLosingResult, 3, season);
    const userPick = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user2),
        eq(picks.week, 3),
        eq(picks.teamPicked, losingTeam),
        eq(picks.season, season),
      ),
    });
    expect(userPick?.result).toEqual("LOST");
    const membersResult = await db.query.members.findFirst({
      where: eq(members.username, user2),
    });
    expect(membersResult?.eliminated).toBeTrue();
  });

  it("should return poolWinner when someone has won the pool", async () => {
    const poolId = await getPoolId();
    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await findPoolWinner(poolMembers);
    expect(poolWinner?.username).toEqual(user1);
  });

  it("should reactivate the pool", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();
    const eliminatedMembersBefore = await db.query.members.findMany({
      where: and(eq(members.poolId, pool.id), eq(members.eliminated, true)),
    });
    expect(eliminatedMembersBefore.length).toBeGreaterThan(0);

    await reactivatePool({ poolId: pool.id });
    const eliminatedMembersAfter = await db.query.members.findMany({
      where: and(eq(members.poolId, pool.id), eq(members.eliminated, true)),
    });
    expect(eliminatedMembersAfter.length).toEqual(0);
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
