import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, picks, pools } from "../../schema";
import { buildPickHeader } from "../../utils/build-pick-header";
import { fetchCurrentGames } from "../../utils/fetch-current-games";
import { fetchPicksDataForUser } from "./backend/fetch-picks-data-for-user";
import { findPoolWinner } from "./backend/find-pool-winner";
import { getEventButtons } from "./backend/get-event-buttons";
import { userEliminationStatus } from "./backend/user-elimination-status";

export const fetchPoolInfoInput = v.object({
  username: v.string(),
  poolId: v.string(),
});

export async function fetchPoolInfo({
  username,
  poolId,
}: v.InferInput<typeof fetchPoolInfoInput>) {
  const poolResult = await db.query.pools.findFirst({
    where: eq(pools.id, poolId),
  });
  if (!poolResult) {
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  }
  const poolMembers = await fetchPoolMembers(poolId);
  const poolMember = poolMembers.find((member) => member.username === username);
  if (!poolMember) {
    throw new TRPCError({
      message: "User is not a member of this pool.",
      code: "NOT_FOUND",
    });
  }
  const games = await fetchCurrentGames();
  const {
    events,
    season: { year: currentSeason },
    week: { number: currentWeek },
  } = games;
  const { userPick, forbiddenTeams } = await fetchPicksDataForUser({
    username,
    poolId,
    week: currentWeek,
    season: currentSeason,
  });

  const picksForPoolAndSeason = await fetchPicks(poolId, currentSeason);
  const poolsResult = await db.query.pools.findFirst({
    where: eq(pools.id, poolId),
  });
  if (!poolsResult)
    throw new TRPCError({
      message: "Pool could not be found.",
      code: "INTERNAL_SERVER_ERROR",
    });
  const { weekStarted, lives } = poolsResult;
  const poolWinner = await findPoolWinner({
    currentWeek,
    picksForPoolAndSeason,
    poolMembers,
    weekStarted,
    lives,
  });
  const { eliminated, livesRemaining } = userEliminationStatus({
    username,
    currentWeek,
    picksForPoolAndSeason,
    weekStarted,
    lives,
  });
  const pickHeader = buildPickHeader({
    events,
    userPick,
    eliminated,
  });
  const eventButtons = getEventButtons({
    events,
    userPick,
    forbiddenTeams,
    eliminated,
  });

  return {
    pickHeader,
    livesRemaining,
    eventButtons,
    currentSeason,
    currentWeek,
    userPickIsSecret: userPick?.pickIsSecret,
    poolName: poolResult.name,
    poolCreator: poolResult.creator,
    poolMembers,
    poolWinner,
  };
}

export async function fetchPoolMembers(poolId: string) {
  return db.query.members.findMany({ where: and(eq(members.poolId, poolId)) });
}

export async function fetchPicks(poolId: string, season: number) {
  return db.query.picks.findMany({
    where: and(eq(picks.poolId, poolId), eq(picks.season, season)),
  });
}
