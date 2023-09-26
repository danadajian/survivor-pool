import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { pools } from "../../schema";
import { joinPool } from "../join/backend";

export const createPoolInput = type({
  name: "string",
  creator: "string",
});

export async function createPool({
  name,
  creator,
}: typeof createPoolInput.infer) {
  const existingPool = await db.query.pools.findFirst({
    where: eq(pools.name, name),
  });

  if (existingPool) {
    throw new TRPCError({
      message: "A pool with that name already exists.",
      code: "CONFLICT",
    });
  }
  const insertResult = await db
    .insert(pools)
    .values({ name, creator })
    .returning({ id: pools.id });
  const poolId = insertResult.find(Boolean)?.id;
  if (!poolId) {
    throw new TRPCError({
      message: "Pool was not created.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
  return joinPool({ username: creator, poolId });
}
