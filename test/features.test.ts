import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { and, eq, or } from "drizzle-orm";

import { updateResults } from "../scripts/update-results/update-results";
import { db } from "../src/db";
import { createPool } from "../src/pages/create/backend";
import { joinPool } from "../src/pages/join/backend";
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
  const week = 1;
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
      week,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: "49ers",
      week,
      season,
      poolId,
    });
    const { userPick } = await fetchPicksDataForUser({
      username: user1,
      week,
      season,
      poolId,
    });
    expect(userPick?.username).toEqual(user1);
    expect(userPick?.week).toEqual(week);
    expect(userPick?.season).toEqual(season);
    expect(userPick?.poolId).toEqual(poolId);
    expect(userPick?.teamPicked).toEqual("Giants");
  });

  it("should have no forbidden picks this week", async () => {
    const poolId = await getPoolId();
    const { forbiddenTeams } = await fetchPicksDataForUser({
      username: user1,
      week,
      season,
      poolId,
    });
    expect(forbiddenTeams).toBeUndefined();
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
    await updateResults(eventsWithPendingResult, week, season);
    const userPicks = await db.query.picks.findMany({
      where: and(eq(picks.week, week), eq(picks.season, season)),
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
    await updateResults(eventsWithWinningResult, week, season);
    const userPick1 = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user1),
        eq(picks.week, week),
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
        eq(picks.week, week),
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

  it("should make team picked forbidden next week", async () => {
    const poolId = await getPoolId();
    const { forbiddenTeams } = await fetchPicksDataForUser({
      username: user1,
      week: 2,
      season,
      poolId,
    });
    expect(forbiddenTeams).toEqual(["Giants"]);
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
    const teamToWin = "Giants";
    const teamToLose = "Cowboys";
    await makePick({
      username: user1,
      teamPicked: teamToWin,
      week: 2,
      season,
      poolId,
    });
    await makePick({
      username: user2,
      teamPicked: teamToLose,
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
                team: { name: teamToWin },
                winner: true,
              },
              {
                team: { name: teamToLose },
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

  it("should update results when team picked loses", async () => {
    const poolId = await getPoolId();
    const teamToLose = "Cowboys";
    await makePick({
      username: user2,
      teamPicked: teamToLose,
      week,
      season,
      poolId,
    });

    const eventsWithLosingResult = [
      {
        competitions: [
          {
            competitors: [
              {
                team: { name: "Giants" },
                winner: true,
              },
              {
                team: { name: teamToLose },
                winner: false,
              },
            ],
          },
        ],
      },
    ] as Events;
    await updateResults(eventsWithLosingResult, week, season);
    const userPick = await db.query.picks.findFirst({
      where: and(
        eq(picks.username, user2),
        eq(picks.week, week),
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
