import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { and, eq, lt } from "drizzle-orm";

import { db } from "../../db";
import { environmentVariables } from "../../env";
import { type EspnResponse } from "../../mocks";
import { picks } from "../../schema";
import { fetchPoolsForUser } from "../home/backend";

export const fetchPicksInput = type({
  username: "string",
  poolId: "string",
});

export const makePickInput = type({
  username: "string",
  teamPicked: "string",
  week: "number",
  season: "number",
  poolId: "string",
});

export async function pickEndpoint({
  username,
  poolId,
}: typeof fetchPicksInput.infer) {
  const userPools = await fetchPoolsForUser({ username });
  const pool = userPools.find((pool) => pool.poolId === poolId);
  if (!pool) {
    throw new TRPCError({
      message: "User is not a member of this pool.",
      code: "NOT_FOUND",
    });
  }
  const games = await fetchGames();
  const userPick = await fetchPickForUser({
    username,
    poolId,
    week: games.week.number,
    season: games.season.year,
  });
  const forbiddenTeams = await fetchForbiddenTeamsForUser({
    username,
    poolId,
    week: games.week.number,
    season: games.season.year,
  });
  return {
    games,
    userPick,
    forbiddenTeams,
    poolName: pool.poolName,
  };
}

export async function fetchGames(fetchMethod = fetch): Promise<EspnResponse> {
  const response = await fetchMethod(environmentVariables.GAMES_API_URL);
  return response.json();
}

export async function fetchPickForUser({
  username,
  poolId,
  week,
  season,
}: Omit<typeof makePickInput.infer, "teamPicked">) {
  return db.query.picks.findFirst({
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      eq(picks.week, week),
      eq(picks.season, season),
    ),
  });
}

export async function fetchForbiddenTeamsForUser({
  username,
  poolId,
  week,
  season,
}: Omit<typeof makePickInput.infer, "teamPicked">) {
  const result = await db.query.picks.findMany({
    columns: { teamPicked: true },
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      lt(picks.week, week),
      eq(picks.season, season),
    ),
  });

  return result.length ? result.map(({ teamPicked }) => teamPicked) : undefined;
}

export async function makePick({
  username,
  teamPicked,
  week,
  season,
  poolId,
}: typeof makePickInput.infer) {
  const existingPick = await fetchPickForUser({
    username,
    poolId,
    week,
    season,
  });
  if (existingPick) {
    return db
      .update(picks)
      .set({ teamPicked })
      .where(eq(picks.id, existingPick.id));
  }
  return db
    .insert(picks)
    .values({ username, teamPicked, week, season, poolId });
}
