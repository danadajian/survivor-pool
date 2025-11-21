import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../../db";
import { members, pools } from "../../../schema";
import {
  fetchCurrentGames,
  type Sport,
} from "../../../utils/fetch-current-games";

export const reactivatePoolInput = v.object({
  poolId: v.pipe(v.string(), v.uuid()),
});

export async function reactivatePool({
  poolId,
}: v.InferInput<typeof reactivatePoolInput>) {
  const existingPool = await db.query.pools.findFirst({
    where: eq(pools.id, poolId),
  });
  if (!existingPool) {
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  }

  const { currentGameDate, currentSeason } = await fetchCurrentGames(
    existingPool.sport as Sport,
  );

  const poolCurrentValue = currentGameDate;

  const [poolResult] = await db
    .update(pools)
    .set({ poolEnd: poolCurrentValue })
    .where(eq(pools.id, poolId))
    .returning();
  if (!poolResult)
    throw new TRPCError({
      message: "Pools could not be updated.",
      code: "INTERNAL_SERVER_ERROR",
    });

  const { id, createdAt, poolEnd, poolWinner, ...poolFieldsToRetain } =
    poolResult;
  const [newPool] = await db
    .insert(pools)
    .values({
      ...poolFieldsToRetain,
      poolStart: poolCurrentValue,
      season: currentSeason,
    })
    .returning();
  if (!newPool)
    throw new TRPCError({
      message: "New pool could not be created.",
      code: "INTERNAL_SERVER_ERROR",
    });

  const existingPoolMembers = await db.query.members.findMany({
    where: eq(members.poolId, poolId),
  });
  const existingPoolMembersWithoutId = existingPoolMembers.map(
    ({ id, ...memberFieldsToRetain }) => memberFieldsToRetain,
  );
  const newMembers = existingPoolMembersWithoutId.map((member) => ({
    ...member,
    poolId: newPool.id,
  }));
  await db.insert(members).values(newMembers);

  return newPool;
}
