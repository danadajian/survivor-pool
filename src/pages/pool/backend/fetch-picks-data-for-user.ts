import { and, eq } from "drizzle-orm";

import { db } from "../../../db";
import { picks } from "../../../schema";

export async function fetchPicksDataForUser({
  username,
  poolId,
  week,
  season,
}: {
  username: string;
  poolId: string;
  week: number;
  season: number;
}) {
  const picksResult = await db.query.picks.findMany({
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      eq(picks.season, season),
    ),
  });
  const userPick = picksResult.find((pick) => pick.week === week);
  const previousPicks = picksResult.filter((pick) => pick.week < week);
  const forbiddenTeams = previousPicks.map(({ teamPicked }) => teamPicked);

  return {
    userPick,
    forbiddenTeams,
  };
}
