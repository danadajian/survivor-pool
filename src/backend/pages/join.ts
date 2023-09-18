import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { members, pools } from "../schema";

export const joinPoolInput = type({
  username: "string",
  poolId: "string",
});

export async function joinPool({
  username,
  poolId,
}: typeof joinPoolInput.infer) {
  const result = await db
    .select({ poolId: pools.id, poolMembersId: members.id })
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
    result.find(({ poolMembersId }) => poolMembersId),
  );
  if (poolMemberExists) {
    throw new TRPCError({
      message: "You have already joined this pool.",
      code: "CONFLICT",
    });
  }
  return db.insert(members).values({ username, poolId });
}
