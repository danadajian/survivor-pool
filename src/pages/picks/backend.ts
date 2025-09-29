import { and, asc, desc, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, picks } from "../../schema";
import { fetchCurrentGames } from "../pool/backend";

export const fetchPicksForPoolInput = v.object({
  poolId: v.string(),
  week: v.optional(v.number()),
  season: v.optional(v.number()),
});

export async function fetchPicksForPool({
  poolId,
  week,
  season,
}: v.InferInput<typeof fetchPicksForPoolInput>) {
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
    .orderBy(desc(picks.result), asc(picks.teamPicked), asc(picks.timestamp));

  const eliminatedUsers = await db.query.members.findMany({
    where: and(eq(members.eliminated, true), eq(members.poolId, poolId)),
  });

  return {
    picks: picksResult,
    eliminatedUsers,
    week: currentWeek,
    season: currentSeason,
  };
}
