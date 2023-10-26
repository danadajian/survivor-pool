import { type } from "arktype";
import { and, asc, eq } from "drizzle-orm";

import { db } from "../../db";
import { members, picks } from "../../schema";
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
    .select({
      username: members.username,
      firstName: members.firstName,
      lastName: members.lastName,
      teamPicked: picks.teamPicked,
      week: picks.week,
      season: picks.season,
      poolId: picks.poolId,
      result: picks.result,
      timestamp: picks.timestamp,
    })
    .from(picks)
    .innerJoin(
      members,
      and(
        eq(picks.username, members.username),
        eq(picks.poolId, members.poolId),
      ),
    )
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
