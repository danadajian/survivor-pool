import { TRPCError } from "@trpc/server";
import { and, eq, lt } from "drizzle-orm";
import * as v from "valibot";

import { type EspnResponse } from "../../../test/mocks";
import { db } from "../../db";
import { environmentVariables } from "../../env";
import { members, picks } from "../../schema";
import { fetchPoolsForUser } from "../home/backend";

export const fetchPicksInput = v.object({
  username: v.string(),
  poolId: v.string(),
});

export const makePickInput = v.object({
  username: v.string(),
  teamPicked: v.string(),
  week: v.number(),
  season: v.number(),
  poolId: v.string(),
});

export async function fetchPoolInfo({
  username,
  poolId,
}: v.InferInput<typeof fetchPicksInput>) {
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
  const poolMembers = await fetchPoolMembers(poolId);
  const poolWinner = await fetchPoolWinner(poolMembers);
  return {
    games,
    userPick,
    forbiddenTeams,
    poolName: pool.poolName,
    eliminated: pool.eliminated,
    poolMembers,
    poolWinner,
  };
}

export async function fetchCurrentGames() {
  if (!environmentVariables.GAMES_API_URL) {
    throw new Error("GAMES_API_URL is required");
  }
  const response = await fetch(environmentVariables.GAMES_API_URL);
  return (await response.json()) as Promise<EspnResponse>;
}

export async function fetchPickForUser({
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
}: {
  username: string;
  poolId: string;
  week: number;
  season: number;
}) {
  const result = await db.query.picks.findMany({
    columns: { teamPicked: true },
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      eq(picks.season, season),
      lt(picks.week, week),
    ),
  });

  return result.length ? result.map(({ teamPicked }) => teamPicked) : undefined;
}

export async function fetchPoolMembers(poolId: string) {
  return db.query.members.findMany({
    where: and(eq(members.poolId, poolId)),
  });
}

export async function fetchPoolWinner(
  poolMembers: (typeof members.$inferSelect)[],
) {
  const membersStillAlive = poolMembers.filter((member) => !member.eliminated);

  return poolMembers.length > 1 && membersStillAlive.length === 1
    ? membersStillAlive[0]
    : undefined;
}

export async function makePick({
  username,
  teamPicked,
  week,
  season,
  poolId,
}: {
  username: string;
  teamPicked: string;
  week: number;
  season: number;
  poolId: string;
}) {
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
