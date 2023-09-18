import { type } from "arktype";
import { and, eq, desc } from "drizzle-orm";
import { db } from "../db";
import { picks } from "../schema";
import { fetchGames } from "./pick";

export const fetchPicksForPoolInput = type({
  poolId: "string",
});

export async function fetchPicksForPool({
  poolId,
}: typeof fetchPicksForPoolInput.infer) {
  const { week, season } = await fetchGames();
  const picksResult = await db
    .select()
    .from(picks)
    .where(
      and(
        eq(picks.week, week.number),
        eq(picks.season, season.year),
        eq(picks.poolId, poolId),
      ),
    )
    .orderBy(desc(picks.season), desc(picks.week));

  return {
    picks: picksResult,
    week: week.number,
  };
}
