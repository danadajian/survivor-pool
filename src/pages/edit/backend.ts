import { eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { pools } from "../../schema";

export const editPoolInput = v.object({
  poolId: v.pipe(v.string(), v.uuid()),
  poolName: v.string(),
  lives: v.number(),
  sport: v.optional(v.picklist(["nfl", "nba", "nhl"])),
});

export async function editPool({
  poolId,
  poolName,
  lives,
  sport,
}: v.InferInput<typeof editPoolInput>) {
  return db
    .update(pools)
    .set({ name: poolName, lives, sport })
    .where(eq(pools.id, poolId))
    .returning();
}
