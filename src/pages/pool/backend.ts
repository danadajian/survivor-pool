import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, picks, pools } from "../../schema";
import { buildPickHeader } from "../../utils/build-pick-header";
import { buildUserDisplayName } from "../../utils/build-user-display-name";
import { checkIfPickIsLocked } from "../../utils/check-if-pick-is-locked";
import { fetchCurrentGames } from "../../utils/fetch-current-games";
import { getPickStatus } from "../../utils/get-pick-status";
import { getEventButtons } from "./backend/get-event-buttons";
import { getForbiddenTeamsForUser } from "./backend/get-forbidden-teams-for-user";
import { userEliminationStatus } from "./backend/user-elimination-status";

export const fetchPoolInfoInput = v.object({
  username: v.string(),
  poolId: v.string(),
});

export async function fetchPoolInfo({
  username,
  poolId,
}: v.InferInput<typeof fetchPoolInfoInput>) {
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

  const picksForPoolAndSeason = await fetchPicks(poolId, currentSeason);
  const poolsResult = await db.query.pools.findFirst({
    where: eq(pools.id, poolId),
  });
  if (!poolsResult)
    throw new TRPCError({
      message: "Pool could not be found.",
      code: "INTERNAL_SERVER_ERROR",
    });
  const {
    weekStarted,
    lives,
    name: poolName,
    creator: poolCreatorUsername,
  } = poolsResult;
  const poolWinnerUsername = poolsResult.poolWinner;
  const poolWinnerMember = poolWinnerUsername
    ? poolMembers.find((member) => member.username === poolWinnerUsername)
    : undefined;
  const poolWinnerDisplayName = poolWinnerUsername
    ? buildUserDisplayName({
        username: poolWinnerUsername,
        firstName: poolWinnerMember?.firstName,
        lastName: poolWinnerMember?.lastName,
      })
    : undefined;
  const { eliminated, livesRemaining } = userEliminationStatus({
    username,
    currentWeek,
    picksForPoolAndSeason,
    weekStarted,
    lives,
    events,
  });
  const userPick = picksForPoolAndSeason.find(
    (pick) => pick.username === username && pick.week === currentWeek,
  );
  const pickIsLocked = checkIfPickIsLocked({
    events,
    userPick,
  });
  const pickStatus = getPickStatus({
    eliminated,
    userPick,
    pickIsLocked,
  });
  const pickHeader = buildPickHeader({
    userPick,
    pickStatus,
    firstName: poolMember.firstName,
  });
  const forbiddenTeams = getForbiddenTeamsForUser({
    username,
    picksForPoolAndSeason,
    events,
  });
  const eventButtons = getEventButtons({
    events,
    userPick,
    forbiddenTeams,
    eliminated,
  });
  const poolCreatorMember = poolMembers.find(
    (member) => member.username === poolCreatorUsername,
  );
  const poolCreatorDisplayName = buildUserDisplayName({
    username: poolCreatorUsername,
    firstName: poolCreatorMember?.firstName,
    lastName: poolCreatorMember?.lastName,
  });

  return {
    pickStatus,
    pickHeader,
    userPick,
    eliminated,
    livesRemaining,
    eventButtons,
    currentSeason,
    currentWeek,
    poolName,
    poolCreatorUsername,
    poolCreatorDisplayName,
    poolMembers,
    poolWinnerDisplayName,
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
