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
import { userIsEliminated } from "./backend/user-is-eliminated";

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
  const { userPick, forbiddenTeams } = await fetchPicksDataForUser({
    username,
    poolId,
    week: currentWeek,
    season: currentSeason,
  });

  const picksForPoolAndSeason = await db.query.picks.findMany({
    where: and(eq(picks.poolId, poolId), eq(picks.season, currentSeason)),
  });
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
    poolId,
    currentWeek,
    picksForPoolAndSeason,
    weekStarted,
    lives,
  });
  const eliminated = userIsEliminated({
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
  const { poolName, creator: poolCreator } = poolMember;

  return {
    pickHeader,
    eventButtons,
    currentSeason,
    currentWeek,
    userPickIsSecret: userPick?.pickIsSecret,
    poolName,
    poolCreator,
    poolMembers,
    poolWinner,
  };
}

async function fetchPoolMembers(poolId: string) {
  return db
    .select({
      username: members.username,
      firstName: members.firstName,
      lastName: members.lastName,
      poolName: pools.name,
      creator: pools.creator,
    })
    .from(members)
    .where(and(eq(members.poolId, poolId)))
    .innerJoin(pools, eq(members.poolId, pools.id));
}
