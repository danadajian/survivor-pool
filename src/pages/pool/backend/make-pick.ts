import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../../db";
import { picks } from "../../../schema";

export const makePickInput = v.object({
  username: v.string(),
  teamPicked: v.string(),
  week: v.number(),
  season: v.number(),
  poolId: v.string(),
  pickIsSecret: v.optional(v.boolean()),
});

export async function makePick({
  username,
  teamPicked,
  week,
  season,
  poolId,
  pickIsSecret,
}: v.InferInput<typeof makePickInput>) {
  const existingPendingPick = await db.query.picks.findFirst({
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      eq(picks.week, week),
      eq(picks.season, season),
      eq(picks.result, "PENDING"),
    ),
  });
  if (existingPendingPick) {
    return db
      .update(picks)
      .set({ teamPicked, pickIsSecret })
      .where(eq(picks.id, existingPendingPick.id));
  }
  return db
    .insert(picks)
    .values({ username, teamPicked, week, season, poolId, pickIsSecret });
}
