import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { userFields } from "../../components/page-wrapper";
import { db } from "../../db";
import { members, pools } from "../../schema";

export const joinPoolInput = v.object({
  ...userFields,
  poolId: v.string(),
});

export async function joinPool({
  username,
  firstName,
  lastName,
  poolId,
}: v.InferInput<typeof joinPoolInput>) {
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

export const poolInput = v.object({
  poolId: v.string(),
});

export async function getPool({ poolId }: v.InferInput<typeof poolInput>) {
  const pool = await db.query.pools.findFirst({ where: eq(pools.id, poolId) });
  if (!pool) {
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  }
  return pool;
}
