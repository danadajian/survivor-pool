import { afterAll, describe, expect, it } from "bun:test";

import { db } from "../../db";
import { members, pools } from "../../schema";
import { joinPool } from "../join/backend";
import { createPool } from "./backend";

describe("create", () => {
  it("can create a new pool", async () => {
    await createPool({ name: "Test Pool", creator: "user1@test.com" });
    const result = await db.select().from(pools);
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Test Pool");
    expect(result[0].creator).toEqual("user1@test.com");
  });

  it("should have added the creator as a member", async () => {
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(1);
    expect(newMembers[0].username).toEqual("user1@test.com");
  });

  it("should allow another user to join the pool", async () => {
    const pool = await db.query.pools.findFirst();
    await joinPool({ username: "user2@test.com", poolId: pool!.id });
    const newMembers = await db.select().from(members);
    expect(newMembers).toHaveLength(2);
    expect(newMembers[0].username).toEqual("user1@test.com");
    expect(newMembers[1].username).toEqual("user2@test.com");
  });

  afterAll(() => {
    process.exit(0);
  });
});
