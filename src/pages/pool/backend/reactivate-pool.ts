import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../../db";
import { picks } from "../../../schema";

export const reactivatePoolInput = v.object({
  poolId: v.string(),
  season: v.number(),
});

export async function reactivatePool({
  poolId,
  season,
}: v.InferInput<typeof reactivatePoolInput>) {
  await db
    .delete(picks)
    .where(and(eq(picks.poolId, poolId), eq(picks.season, season)));
}
