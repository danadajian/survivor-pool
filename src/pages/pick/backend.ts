import { TRPCError } from "@trpc/server";
import { type } from "arktype";
import { and, eq, lt } from "drizzle-orm";

import { type EspnResponse } from "../../../test/mocks";
import { db } from "../../db";
import { environmentVariables } from "../../env";
import { members, picks } from "../../schema";
import { fetchPoolsForUser } from "../home/backend";

export const fetchPicksInput = type({
  username: "string>0",
  poolId: "string>0",
});

export const makePickInput = type({
  username: "string>0",
  teamPicked: "string>0",
  week: "number",
  season: "number",
  poolId: "string>0",
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
  const games = await fetchCurrentGames();
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
  const poolWinner = await fetchPoolWinner({ poolId });
  return {
    games,
    userPick,
    forbiddenTeams,
    poolName: pool.poolName,
    eliminated: pool.eliminated,
    poolWinner,
  };
}

export async function fetchCurrentGames(fetchMethod = fetch) {
  const response = await fetchMethod(environmentVariables.GAMES_API_URL);
  return (await response.json()) as Promise<EspnResponse>;
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

export async function fetchPoolWinner({ poolId }: { poolId: string }) {
  const membersStillAlive = await db.query.members.findMany({
    where: and(eq(members.poolId, poolId), eq(members.eliminated, false)),
  });

  return membersStillAlive.length === 1 ? membersStillAlive[0] : undefined;
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
