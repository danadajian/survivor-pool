import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { userFields } from "../../components/page-wrapper";
import { db } from "../../db";
import { members, pools } from "../../schema";

export const joinPoolInput = type({
  ...userFields,
  poolId: "string>=1",
});

export async function joinPool({
  username,
  firstName,
  lastName,
  poolId,
}: typeof joinPoolInput.infer) {
  const result = await db
    .select({
      poolId: pools.id,
      poolMembersId: members.id,
      username: members.username,
    })
    .from(pools)
    .where(eq(pools.id, poolId))
    .leftJoin(members, eq(pools.id, members.poolId));

  const poolExists = Boolean(result.find(({ poolId }) => poolId));
  if (!poolExists) {
    throw new TRPCError({
      message: "Pool does not exist.",
      code: "CONFLICT",
    });
  }
  const poolMemberExists = Boolean(
    result.find(({ username: existingMember }) => username === existingMember),
  );
  if (poolMemberExists) {
    throw new TRPCError({
      message: "You have already joined this pool.",
      code: "CONFLICT",
    });
  }
  const rows = await db
    .insert(members)
    .values({ username, firstName, lastName, poolId })
    .returning({ poolId: members.poolId });
  return rows.find(Boolean);
}

export const getPoolInput = type({
  poolId: "string>=1",
});

export async function getPool({ poolId }: typeof getPoolInput.infer) {
  const pool = await db.query.pools.findFirst({ where: eq(pools.id, poolId) });
  if (!pool) {
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  }
  return pool;
}
