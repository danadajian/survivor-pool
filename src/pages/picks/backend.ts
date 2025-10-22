import { and, asc, desc, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, picks } from "../../schema";
import {
  fetchCurrentGames,
  GamesResponse,
  userIsEliminated,
} from "../pool/backend";

export const fetchPicksForPoolInput = v.object({
  poolId: v.string(),
  week: v.optional(v.number()),
  season: v.optional(v.number()),
});

export async function fetchPicksForPool(
  input: v.InferInput<typeof fetchPicksForPoolInput>,
) {
  const gamesResponse = await fetchCurrentGames();
  return fetchPicksForPoolWithGamesResponse({ ...input, gamesResponse });
}

export async function fetchPicksForPoolWithGamesResponse({
  poolId,
  week,
  season,
  gamesResponse,
}: v.InferInput<typeof fetchPicksForPoolInput> & {
  gamesResponse: GamesResponse;
}) {
  const {
    week: { number: currentWeek },
    season: { year: currentSeason },
    events,
  } = gamesResponse;
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
      pickIsSecret: picks.pickIsSecret,
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

  const picksWithSecrets = picksResult.map((pick) => {
    const competitionWithTeamPicked = events.find((event) =>
      event.competitions[0]?.competitors.some(
        (competitor) => competitor.team.name === pick.teamPicked,
      ),
    )?.competitions[0];
    const pickShouldBeSecret =
      pick.pickIsSecret &&
      competitionWithTeamPicked?.status.type.name === "STATUS_SCHEDULED";
    const teamPicked = pickShouldBeSecret ? "SECRET" : pick.teamPicked;
    return {
      ...pick,
      teamPicked,
    };
  });

  const poolMembers = await db.query.members.findMany({
    where: eq(members.poolId, poolId),
  });
  const picksForPoolAndSeason = await db.query.picks.findMany({
    where: and(eq(picks.poolId, poolId), eq(picks.season, currentSeason)),
  });
  const eliminatedUsers = poolMembers.filter(({ username }) =>
    userIsEliminated({
      username,
      currentWeek: weekToUse,
      picksForPoolAndSeason,
    }),
  );

  return {
    picks: picksWithSecrets,
    eliminatedUsers,
    week: currentWeek,
    season: currentSeason,
  };
}
