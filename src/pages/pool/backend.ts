import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { environmentVariables } from "../../env";
import { members, picks, pools } from "../../schema";
import { poolInput } from "../join/backend";

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
  pickIsSecret: v.optional(v.boolean()),
});

export async function fetchPoolInfo({
  username,
  poolId,
}: v.InferInput<typeof fetchPicksInput>) {
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
  const poolWinner = await findPoolWinner(poolMembers);

  return {
    events,
    currentSeason,
    currentWeek,
    teamUserPicked: userPick?.teamPicked,
    userPickIsSecret: userPick?.pickIsSecret,
    userPickResult: userPick?.result,
    forbiddenTeams,
    poolName: poolMember.poolName,
    eliminated: poolMember.eliminated,
    poolCreator: poolMember.creator,
    poolMembers,
    poolWinner,
  };
}

const eventsSchema = v.array(
  v.object({
    season: v.object({
      slug: v.string(),
    }),
    date: v.string(),
    competitions: v.array(
      v.object({
        date: v.string(),
        odds: v.optional(
          v.array(
            v.object({
              details: v.string(),
              awayTeamOdds: v.object({
                favorite: v.boolean(),
              }),
              homeTeamOdds: v.object({
                favorite: v.boolean(),
              }),
            }),
          ),
        ),
        competitors: v.array(
          v.object({
            homeAway: v.string(),
            team: v.object({
              name: v.string(),
              abbreviation: v.string(),
              logo: v.string(),
            }),
            winner: v.optional(v.boolean()),
          }),
        ),
      }),
    ),
  }),
);
const gamesSchema = v.object({
  week: v.object({
    number: v.number(),
  }),
  season: v.object({
    year: v.number(),
  }),
  events: eventsSchema,
});
export type Events = v.InferInput<typeof eventsSchema>;
type GamesResponse = {
  events: Events;
  week: {
    number: number;
  };
  season: {
    year: number;
  };
};
export async function fetchCurrentGames(): Promise<GamesResponse> {
  if (!environmentVariables.GAMES_API_URL) {
    throw new Error("GAMES_API_URL is required");
  }
  const response = await fetch(environmentVariables.GAMES_API_URL);
  const games = await response.json();
  const parseResult = v.safeParse(gamesSchema, games);
  if (!parseResult.success)
    throw new TRPCError({
      message: "ESPN has changed their API recently, an update is needed.",
      code: "INTERNAL_SERVER_ERROR",
    });
  const parsedGames = parseResult.output;
  const filteredEvents = parsedGames.events.filter(
    (event) => event.season.slug !== "preseason",
  );
  return {
    events: filteredEvents,
    week: parsedGames.week,
    season: parsedGames.season,
  };
}

export async function fetchPicksDataForUser({
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
  const picksResult = await db.query.picks.findMany({
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      eq(picks.season, season),
    ),
  });
  const userPick = picksResult.find((pick) => pick.week === week);
  const previousPicks = picksResult.filter((pick) => pick.week < week);
  const forbiddenTeams = previousPicks.length
    ? previousPicks.map(({ teamPicked }) => teamPicked)
    : undefined;

  return {
    userPick,
    forbiddenTeams,
  };
}

export async function fetchPoolMembers(poolId: string) {
  return db
    .select({
      username: members.username,
      firstName: members.firstName,
      lastName: members.lastName,
      eliminated: members.eliminated,
      poolName: pools.name,
      creator: pools.creator,
    })
    .from(members)
    .where(and(eq(members.poolId, poolId)))
    .innerJoin(pools, eq(members.poolId, pools.id));
}

export async function findPoolWinner(
  poolMembers: Partial<typeof members.$inferSelect>[],
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
  pickIsSecret,
}: {
  username: string;
  teamPicked: string;
  week: number;
  season: number;
  poolId: string;
  pickIsSecret?: boolean;
}) {
  const existingPendingPick = await db.query.picks.findFirst({
    where: and(
      eq(picks.username, username),
      eq(picks.poolId, poolId),
      eq(picks.week, week),
      eq(picks.season, season),
      eq(picks.result, "PENDING"),
    ),
  });
  if (existingPendingPick) {
    return db
      .update(picks)
      .set({ teamPicked, pickIsSecret })
      .where(eq(picks.id, existingPendingPick.id));
  }
  return db
    .insert(picks)
    .values({ username, teamPicked, week, season, poolId, pickIsSecret });
}

export async function deletePool({ poolId }: v.InferInput<typeof poolInput>) {
  return db.delete(pools).where(eq(pools.id, poolId));
}

export async function reactivatePool({
  poolId,
}: v.InferInput<typeof poolInput>) {
  await db
    .update(members)
    .set({ eliminated: false })
    .where(eq(members.poolId, poolId));
}
