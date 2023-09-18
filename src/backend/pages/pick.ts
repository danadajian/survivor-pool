import type { EspnResponse } from "../mocks";
import { environmentVariables } from "../env";
import { db } from "../db";
import { type } from "arktype";
import { and, eq, lt } from "drizzle-orm";
import { picks, members, pools } from "../schema";
import { TRPCError } from "@trpc/server";

export const fetchPicksInput = type({
  username: "string",
  poolId: "string",
});

export const fetchPoolsForUserInput = type({
  username: "string",
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
  const userIsInPool = Boolean(
    userPools.find((pool) => pool.poolId === poolId),
  );
  if (!userIsInPool) {
    throw new TRPCError({
      message: "User is not a member of this pool.",
      code: "NOT_FOUND",
    });
  }
  const games = await fetchGames();
  const userPick = await fetchPickForUser({
    username,
    week: games.week.number,
    season: games.season.year,
  });
  const forbiddenTeams = await fetchForbiddenTeamsForUser({
    username,
    week: games.week.number,
    season: games.season.year,
  });
  return {
    games,
    userPick,
    forbiddenTeams,
  };
}

export async function fetchGames(fetchMethod = fetch): Promise<EspnResponse> {
  const response = await fetchMethod(environmentVariables.GAMES_API_URL);
  return response.json();
}

export async function fetchPickForUser({
  username,
  week,
  season,
}: Pick<typeof makePickInput.infer, "username" | "week" | "season">) {
  return db.query.picks.findFirst({
    where: and(
      eq(picks.username, username),
      eq(picks.week, week),
      eq(picks.season, season),
    ),
  });
}

export async function fetchForbiddenTeamsForUser({
  username,
  week,
  season,
}: Pick<typeof makePickInput.infer, "username" | "week" | "season">) {
  const result = await db.query.picks.findMany({
    columns: { teamPicked: true },
    where: and(
      eq(picks.username, username),
      lt(picks.week, week),
      eq(picks.season, season),
    ),
  });

  return result.length ? result.map(({ teamPicked }) => teamPicked) : undefined;
}

export async function fetchPoolsForUser({
  username,
}: typeof fetchPoolsForUserInput.infer) {
  return db
    .select({ poolId: pools.id, poolName: pools.name })
    .from(members)
    .where(eq(members.username, username))
    .innerJoin(pools, eq(members.poolId, pools.id));
}

export async function makePick({
  username,
  teamPicked,
  week,
  season,
  poolId,
}: typeof makePickInput.infer) {
  const existingPick = await fetchPickForUser({ username, week, season });
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
