import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../../db";
import { members, picks, pools } from "../../../schema";
import { fetchCurrentGames } from "../../../utils/fetch-current-games";
import { userEliminationStatus } from "./user-elimination-status";

export const fetchPoolMembersInput = v.object({
  poolId: v.pipe(v.string(), v.uuid()),
});

export const fetchPicksForWeekInput = v.object({
  poolId: v.pipe(v.string(), v.uuid()),
  pickDate: v.string(),
  season: v.number(),
});

export async function fetchPicksForWeek({
  poolId,
  pickDate,
  season,
}: v.InferInput<typeof fetchPicksForWeekInput>) {
  const gamesResponse = await fetchCurrentGames();
  const { events } = gamesResponse;

  const picksResult = await db
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

  const picksWithSecrets = picksResult.map((pick) => {
    const competitionWithTeamPicked = events.find((event) =>
      event.competitions[0]?.competitors.some(
        (competitor) => competitor.team.name === pick.teamPicked,
      ),
    )?.competitions[0];
    const pickShouldBeSecret =
      pick.pickIsSecret &&
      competitionWithTeamPicked?.status.type.name === "STATUS_SCHEDULED";
    const teamPicked = pickShouldBeSecret ? "SECRET" : pick.teamPicked;
    return {
      ...pick,
      teamPicked,
    };
  });

  return picksWithSecrets;
}

export async function fetchPoolMembers({
  poolId,
}: v.InferInput<typeof fetchPoolMembersInput>) {
  const gamesResponse = await fetchCurrentGames();

  const {
    week: { number: currentWeek },
    season: { year: currentSeason },
  } = gamesResponse;

  const poolMembers = await db.query.members.findMany({
    where: eq(members.poolId, poolId),
  });
  const picksForPoolAndSeason = await db.query.picks.findMany({
    where: and(eq(picks.poolId, poolId), eq(picks.season, currentSeason)),
  });
  const poolsResult = await db.query.pools.findFirst({
    where: eq(pools.id, poolId),
  });
  if (!poolsResult)
    throw new TRPCError({
      message: "Pool not found.",
      code: "NOT_FOUND",
    });
  const { lives } = poolsResult;
  const membersWithEliminationStatus = poolMembers
    .map((member) => ({
      ...member,
      ...userEliminationStatus({
        username: member.username,
        picksForPoolAndSeason,
        lives,
        events: gamesResponse.events,
      }),
    }))
    .toSorted((a, b) => b.livesRemaining - a.livesRemaining);

  return {
    membersWithEliminationStatus,
    lives,
    pickDate: `Week ${currentWeek}`,
    season: currentSeason,
  };
}
