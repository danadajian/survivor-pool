import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { userFields } from "../../components/page-wrapper";
import { db } from "../../db";
import { pools } from "../../schema";
import { joinPool } from "../join/backend";

export const createPoolInput = type({
  ...userFields,
  poolName: "string>=1",
});

export async function createPool({
  poolName,
  username,
  firstName,
  lastName,
}: typeof createPoolInput.infer) {
  const existingPool = await db.query.pools.findFirst({
    where: eq(pools.name, poolName),
  });

  if (existingPool) {
    throw new TRPCError({
      message: "A pool with that name already exists.",
      code: "CONFLICT",
    });
  }
  const insertResult = await db
    .insert(pools)
    .values({ name: poolName, creator: username })
    .returning({ id: pools.id });
  const poolId = insertResult.find(Boolean)?.id;
  if (!poolId) {
    throw new TRPCError({
      message: "Pool was not created.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
  return joinPool({ username, firstName, lastName, poolId });
}
