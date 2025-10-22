import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { environmentVariables } from "../../env";
import { members, picks, pools } from "../../schema";
import { buildPickHeader } from "../../utils/build-pick-header";
import { ButtonStyle } from "../../utils/button-style";
import { checkIfPickIsLocked } from "../../utils/check-if-pick-is-locked";
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
  const poolWinner = await findPoolWinner(poolId, currentWeek, currentSeason);

  const eliminated = await userIsEliminated({
    username,
    poolId,
    currentWeek,
    currentSeason,
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

export function getEventButtons({
  events,
  userPick,
  forbiddenTeams,
  eliminated,
}: {
  events: Events;
  userPick?: typeof picks.$inferSelect;
  forbiddenTeams: string[];
  eliminated: boolean;
}): EventButton[] {
  return events.map((event) => {
    const competition = event.competitions[0];
    return {
      awayTeamButton: buildTeamButtonProps({
        teamType: "away",
        events,
        competition,
        userPick,
        forbiddenTeams,
        eliminated,
      }),
      homeTeamButton: buildTeamButtonProps({
        teamType: "home",
        events,
        competition,
        userPick,
        forbiddenTeams,
        eliminated,
      }),
      competition,
    };
  });
}

export function buildTeamButtonProps({
  teamType,
  events,
  competition,
  userPick,
  forbiddenTeams,
  eliminated,
}: {
  teamType: "home" | "away";
  events: Events;
  competition: Competition;
  userPick?: typeof picks.$inferSelect;
  forbiddenTeams: string[];
  eliminated: boolean;
}): TeamButtonProps {
  const competitors = competition?.competitors ?? [];
  const team = competitors.find(
    (competitor) => competitor.homeAway === teamType,
  )?.team;
  const gameStartedOrFinished =
    competition.status.type.name !== "STATUS_SCHEDULED";
  const teamCurrentlyPicked = team?.name === userPick?.teamPicked;
  const teamPreviouslyPicked = forbiddenTeams.includes(team?.name ?? "");
  const pickIsLocked = checkIfPickIsLocked({
    events,
    userPick,
  });
  const buttonDisabledForOtherReason =
    gameStartedOrFinished || pickIsLocked || eliminated;
  const buttonDisabled = teamPreviouslyPicked || buttonDisabledForOtherReason;
  const buttonStyle = teamCurrentlyPicked
    ? ButtonStyle.CURRENTLY_PICKED
    : teamPreviouslyPicked
      ? ButtonStyle.PREVIOUSLY_PICKED
      : buttonDisabledForOtherReason
        ? ButtonStyle.PICK_FORBIDDEN
        : ButtonStyle.DEFAULT;
  return {
    team,
    buttonDisabled,
    buttonStyle,
  };
}

export type Competition = Events[number]["competitions"][number];
type Team = Competition["competitors"][number]["team"];
export type EventButton = {
  awayTeamButton: TeamButtonProps;
  homeTeamButton: TeamButtonProps;
  competition: Competition;
};
export type TeamButtonProps = {
  team?: Team;
  buttonDisabled: boolean;
  buttonStyle: ButtonStyle;
};

const eventsSchema = v.array(
  v.object({
    season: v.object({
      slug: v.string(),
    }),
    competitions: v.array(
      v.object({
        date: v.string(),
        status: v.object({
          type: v.object({
            name: v.union([
              v.literal("STATUS_SCHEDULED"),
              v.literal("STATUS_IN_PROGRESS"),
              v.literal("STATUS_FINAL"),
            ]),
          }),
        }),
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
export type GamesResponse = {
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
  const forbiddenTeams = previousPicks.map(({ teamPicked }) => teamPicked);

  return {
    userPick,
    forbiddenTeams,
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

export async function findPoolWinner(
  poolId: string,
  currentWeek: number,
  season: number,
) {
  const picksResults = await db
    .select()
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
        eq(picks.poolId, poolId),
        eq(picks.week, currentWeek),
        eq(picks.season, season),
      ),
    );

  const numberOfPendingPicks = picksResults.filter(
    ({ picks }) => picks.result === "PENDING",
  ).length;
  const numberOfWinningPicks = picksResults.filter(
    ({ picks }) => picks.result === "WON",
  ).length;
  if (numberOfPendingPicks === 0 && numberOfWinningPicks === 1) {
    return picksResults.find(({ picks }) => picks.result === "WON");
  }
  return undefined;
}

export async function userIsEliminated({
  username,
  currentWeek,
  currentSeason,
  poolId,
}: {
  username: string;
  currentWeek: number;
  currentSeason: number;
  poolId: string;
}) {
  const picksResult = await db.query.picks.findMany({
    where: and(eq(picks.poolId, poolId), eq(picks.season, currentSeason)),
  });
  if (failedToPickLastWeek(picksResult, username, currentWeek)) {
    return true;
  }
  const allPicksThisWeek = picksResult.filter(
    (pick) => pick.week === currentWeek,
  );
  const userLost = allPicksThisWeek.some(
    (pick) => pick.username === username && pick.result === "LOST",
  );
  const atLeastOneUserWon = allPicksThisWeek.some(
    (pick) => pick.result === "WON",
  );

  return userLost && atLeastOneUserWon;
}

function failedToPickLastWeek(
  allUserPicks: (typeof picks.$inferSelect)[],
  username: string,
  week: number,
) {
  return (
    week > 1 &&
    !allUserPicks.some((pick) => pick.username === username && pick.week < week)
  );
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

export const reactivatePoolInput = v.object({
  poolId: v.string(),
  season: v.number(),
});

export async function reactivatePool({
  poolId,
  season,
}: v.InferInput<typeof reactivatePoolInput>) {
  await db
    .update(members)
    .set({ eliminated: false })
    .where(eq(members.poolId, poolId));
  await db
    .delete(picks)
    .where(and(eq(picks.poolId, poolId), eq(picks.season, season)));
}
