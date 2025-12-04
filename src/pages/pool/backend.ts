import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, picks, pools } from "../../schema";
import { buildPickHeader } from "../../utils/build-pick-header";
import { buildUserDisplayName } from "../../utils/build-user-display-name";
import { fetchCurrentGames } from "../../utils/fetch-current-games";
import { getPickStatus } from "../../utils/get-pick-status";
import { getEventButtons } from "./backend/get-event-buttons";
import { getPreviouslyPickedTeamsForUser } from "./backend/get-previously-picked-teams-for-user";
import { userEliminationStatus } from "./backend/user-elimination-status";

export const fetchPoolInfoInput = v.object({
  username: v.string(),
  poolId: v.pipe(v.string(), v.uuid()),
  pickDate: v.optional(v.string()),
});

export async function fetchPoolInfo({
  username,
  poolId,
  pickDate: requestedPickDate,
}: v.InferInput<typeof fetchPoolInfoInput>) {
  const poolsWithMembers = await db
    .select()
    .from(pools)
    .leftJoin(members, eq(pools.id, members.poolId))
    .where(eq(pools.id, poolId));

  const pool = poolsWithMembers[0]?.pools;
  if (!pool) {
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  }

  const poolMembers = poolsWithMembers
    .map((row) => row.members)
    .filter((member) => member !== null);
  const poolMember = poolMembers.find((member) => member.username === username);
  if (!poolMember) {
    throw new TRPCError({
      message: "User is not a member of this pool.",
      code: "NOT_FOUND",
    });
  }

  const {
    lives,
    name: poolName,
    creator: poolCreatorUsername,
    sport,
    poolWinner,
  } = pool;

  const games = await fetchCurrentGames(sport);
  const { events, currentSeason, currentGameDate } = games;
  const picksForPoolAndSeason = await fetchPicks(poolId, currentSeason);

  const poolWinnerMember = poolWinner
    ? poolMembers.find((member) => member.username === poolWinner)
    : undefined;
  const poolWinnerDisplayName = poolWinner
    ? buildUserDisplayName({
        username: poolWinner,
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

  const availablePickDates = Array.from(
    new Set([
      ...picksForPoolAndSeason.map((pick) => pick.pickDate),
      currentGameDate,
    ]),
  ).sort((a, b) => {
    if (a.startsWith("Week") && b.startsWith("Week")) {
      return Number(a.split(" ")[1] ?? 0) - Number(b.split(" ")[1] ?? 0);
    }
    return a.localeCompare(b);
  });

  const userPickTeam = events
    .flatMap((event) => event.competitions)
    .flatMap((competition) => competition.competitors)
    .find((competitor) => competitor.team.name === userPick?.teamPicked)?.team;

  const membersWithEliminationStatus = poolMembers
    .map((member) => ({
      ...member,
      ...userEliminationStatus({
        username: member.username,
        picksForPoolAndSeason,
        lives,
        events,
      }),
    }))
    .toSorted((a, b) => b.livesRemaining - a.livesRemaining);

  const pickDate = requestedPickDate ?? currentGameDate;

  const picksForWeek = await fetchPicksForWeek({
    poolId,
    pickDate,
    season: currentSeason,
  });

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
    availablePickDates,
    membersWithEliminationStatus,
    lives,
    picksForWeek,
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

export async function fetchPicksForWeek({
  poolId,
  pickDate,
  season,
}: {
  poolId: string;
  pickDate: string;
  season: number;
}) {
  const picksForWeekResult = await db
    .select({
      username: members.username,
      firstName: members.firstName,
      lastName: members.lastName,
      teamPicked: picks.teamPicked,
      pickDate: picks.pickDate,
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
        eq(picks.pickDate, pickDate),
        eq(picks.season, season),
        eq(picks.poolId, poolId),
      ),
    )
    .orderBy(desc(picks.result), asc(picks.teamPicked), asc(picks.timestamp));

  const picksForWeek = picksForWeekResult.map((pick) => {
    const pickShouldBeSecret = pick.pickIsSecret && pick.result === "PENDING";
    const teamPicked = pickShouldBeSecret ? "SECRET" : pick.teamPicked;
    return {
      ...pick,
      teamPicked,
    };
  });

  return picksForWeek;
}
