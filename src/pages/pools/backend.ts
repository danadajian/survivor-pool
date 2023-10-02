import { type } from "arktype";
import { and, asc, eq } from "drizzle-orm";

import { db } from "../../db";
import { picks } from "../../schema";
import { fetchCurrentGames } from "../pick/backend";

export const fetchPicksForPoolInput = type({
  poolId: "string",
  "week?": "number | null",
  "season?": "number | null",
});

export async function fetchPicksForPool({
  poolId,
  week,
  season,
}: typeof fetchPicksForPoolInput.infer) {
  const {
    week: { number: currentWeek },
    season: { year: currentSeason },
  } = await fetchCurrentGames();
  const weekToUse = week ?? currentWeek;
  const seasonToUse = season ?? currentSeason;
  const picksResult = await db
    .select()
    .from(picks)
    .where(
      and(
        eq(picks.week, weekToUse),
        eq(picks.season, seasonToUse),
        eq(picks.poolId, poolId),
      ),
    )
    .orderBy(asc(picks.timestamp));

  return {
    picks: picksResult,
    week: currentWeek,
    season: currentSeason,
  };
}
