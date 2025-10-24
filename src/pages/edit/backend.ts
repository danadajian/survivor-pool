import { eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { pools } from "../../schema";

export const editPoolInput = v.object({
  poolId: v.string(),
  poolName: v.string(),
  lives: v.number(),
});

export async function editPool({
  poolId,
  poolName,
  lives,
}: v.InferInput<typeof editPoolInput>) {
  return db
    .update(pools)
    .set({ name: poolName, lives })
    .where(eq(pools.id, poolId))
    .returning();
}
