import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { poolMembers, pools } from "../schema";

export const joinPoolInput = type({
  username: "string",
  poolId: "number",
});

export async function joinPool({
  username,
  poolId,
}: typeof joinPoolInput.infer) {
  const result = await db
    .select({ poolId: pools.id, poolMembersId: poolMembers.id })
    .from(pools)
    .where(eq(pools.id, poolId))
    .leftJoin(poolMembers, eq(pools.id, poolMembers.poolId));

  const poolExists = Boolean(result.find(({ poolId }) => poolId));
  if (!poolExists) {
    throw new TRPCError({
      message: "Pool does not exist.",
      code: "CONFLICT",
    });
  }
  const poolMemberExists = Boolean(
    result.find(({ poolMembersId }) => poolMembersId),
  );
  if (poolMemberExists) {
    throw new TRPCError({
      message: "You have already joined this pool.",
      code: "CONFLICT",
    });
  }
  return db.insert(poolMembers).values({ username, poolId });
}
