import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, picks, pools } from "../../schema";
import { buildPickHeader } from "../../utils/build-pick-header";
import { buildUserDisplayName } from "../../utils/build-user-display-name";
import { fetchCurrentGames, type Sport } from "../../utils/fetch-current-games";
import { getPickStatus } from "../../utils/get-pick-status";
import { getEventButtons } from "./backend/get-event-buttons";
import { getPreviouslyPickedTeamsForUser } from "./backend/get-previously-picked-teams-for-user";
import { userEliminationStatus } from "./backend/user-elimination-status";

export const fetchPoolInfoInput = v.object({
  username: v.string(),
  poolId: v.pipe(v.string(), v.uuid()),
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
  const poolsResult = await db.query.pools.findFirst({
    where: eq(pools.id, poolId),
  });
  if (!poolsResult)
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  const {
    lives,
    name: poolName,
    creator: poolCreatorUsername,
    sport,
  } = poolsResult;
  const games = await fetchCurrentGames(sport as Sport);
  const { events, currentSeason, currentGameDate } = games;

  const picksForPoolAndSeason = await fetchPicks(poolId, currentSeason);

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
    picksForPoolAndSeason,
    lives,
    events,
  });
  const userPick = picksForPoolAndSeason.find(
    (pick) => pick.username === username && pick.pickDate === currentGameDate,
  );
  const previouslyPickedTeams = getPreviouslyPickedTeamsForUser({
    username,
    picksForPoolAndSeason,
    events,
  });
  const pickStatus = getPickStatus({
    eliminated,
    userPick,
    events,
    previouslyPickedTeams,
  });
  const pickHeader = buildPickHeader({
    userPick,
    pickStatus,
    firstName: poolMember.firstName,
  });
  const eventButtons = getEventButtons({
    events,
    userPick,
    previouslyPickedTeams,
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

  const userPickTeam = events
    .flatMap((event) => event.competitions)
    .flatMap((competition) => competition.competitors)
    .find((competitor) => competitor.team.name === userPick?.teamPicked)?.team;

  return {
    pickStatus,
    pickHeader,
    userPick,
    userPickTeam,
    livesRemaining,
    eventButtons,
    currentSeason,
    currentGameDate,
    poolName,
    poolCreatorUsername,
    poolCreatorDisplayName,
    poolMembers,
    poolWinnerDisplayName,
    sport,
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
