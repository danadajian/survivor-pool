import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { eq } from "drizzle-orm";

import { db } from "../src/db";
import { createPool } from "../src/pages/create/backend";
import { joinPool } from "../src/pages/join/backend";
import {
  deletePool,
  fetchForbiddenTeamsForUser,
  fetchPickForUser,
  fetchPoolMembers,
  fetchPoolWinner,
  makePick,
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

  const username = "user1@test.com";
  const week = 1;
  const season = 2023;
  const poolId = "436297e8-b766-4d3a-934b-ba17ee3a72a8";
  const teamPicked = "Giants";

  it("should create a new pool", async () => {
    await createPool({ poolName: "Test Pool", username });
    const result = await db.select().from(pools);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toEqual("Test Pool");
    expect(result[0]?.creator).toEqual(username);
  });

  it("should have added the creator as a member", async () => {
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(1);
    expect(newMembers[0]?.username).toEqual(username);
  });

  it("should not return poolWinner when only one person is in the pool", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();

    const poolMembers = await fetchPoolMembers(pool.id);
    const poolWinner = await fetchPoolWinner(poolMembers);
    expect(poolWinner).toBeUndefined();
  });

  it("should allow another user to join the pool", async () => {
    const newUser = "user2@test.com";
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();
    await joinPool({ username: newUser, poolId: pool.id });
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(2);
    expect(newMembers[0]?.username).toEqual(username);
    expect(newMembers[1]?.username).toEqual(newUser);
  });

  it("should allow user to make a new pick", async () => {
    await makePick({
      username,
      teamPicked,
      week,
      season,
      poolId,
    });
    const pick = await fetchPickForUser({
      username,
      week,
      season,
      poolId,
    });
    expect(pick?.username).toEqual(username);
    expect(pick?.week).toEqual(week);
    expect(pick?.season).toEqual(season);
    expect(pick?.poolId).toEqual(poolId);
    expect(pick?.teamPicked).toEqual(teamPicked);
  });

  it("should have no forbidden picks this week", async () => {
    const forbiddenTeams = await fetchForbiddenTeamsForUser({
      username,
      week,
      season,
      poolId,
    });
    expect(forbiddenTeams).toBeUndefined();
  });

  it("should make team picked forbidden next week", async () => {
    const forbiddenTeams = await fetchForbiddenTeamsForUser({
      username,
      week: 2,
      season,
      poolId,
    });
    expect(forbiddenTeams).toEqual([teamPicked]);
  });

  it("should not return poolWinner when no one has won the pool yet", async () => {
    const results = await db.query.members.findMany();
    if (!results[0]) throw new Error();
    const poolId = results[0].poolId;

    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await fetchPoolWinner(poolMembers);
    expect(poolWinner).toBeUndefined();
  });

  it("should return poolWinner when someone has won the pool", async () => {
    const results = await db
      .update(members)
      .set({ eliminated: true })
      .where(eq(members.username, "user2@test.com"))
      .returning({ poolId: members.poolId });
    if (!results[0]) throw new Error();
    const poolId = results[0].poolId;

    const poolMembers = await fetchPoolMembers(poolId);
    const poolWinner = await fetchPoolWinner(poolMembers);
    expect(poolWinner?.username).toEqual(username);
  });

  it("should delete the pool", async () => {
    const pool = await db.query.pools.findFirst();
    if (!pool) throw new Error();

    await deletePool({ poolId: pool.id });
    const pools = await db.query.pools.findMany();
    expect(pools.length).toEqual(0);
  });
});
