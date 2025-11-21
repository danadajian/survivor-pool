import { TRPCError } from "@trpc/server";
import * as v from "valibot";

import { logger } from "./logger";

export const SPORT_URLS = {
  nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
  nhl: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
} as const;

export type Sport = keyof typeof SPORT_URLS;

export async function fetchCurrentGames(
  sport: Sport = "nfl",
): Promise<GamesResponse> {
  const url = SPORT_URLS[sport];
  if (!url) {
    throw new Error(`Invalid sport: ${sport}`);
  }
  const response = await fetch(url);
  const games = await response.json();
  const parseResult = v.safeParse(gamesSchema, games);
  if (!parseResult.success) {
    logger.error(
      { issues: parseResult.issues.map((issue) => issue.message) },
      "Failed to validate games response from API.",
    );
    throw new TRPCError({
      message: "ESPN has changed their API recently, an update is needed.",
      code: "PARSE_ERROR",
    });
  }
  const parsedGames = parseResult.output;
  const filteredEvents = parsedGames.events.filter(
    (event) => event.season.slug !== "preseason",
  );

  const currentGameDate = parsedGames.week
    ? `Week ${parsedGames.week.number}`
    : parsedGames.day?.date;
  if (!currentGameDate) {
    throw new TRPCError({
      message: "Could not determine current game date from API response.",
      code: "PARSE_ERROR",
    });
  }

  return {
    events: filteredEvents,
    currentGameDate,
    currentSeason: parsedGames.season.year,
  };
}

export type Events = v.InferInput<typeof eventsSchema>;
export type GamesResponse = {
  events: Events;
  currentGameDate: string;
  currentSeason: number;
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
            name: v.string(),
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
              logo: v.string(),
              displayName: v.string(),
            }),
            winner: v.optional(v.boolean()),
          }),
        ),
      }),
    ),
  }),
);

const gamesSchema = v.object({
  week: v.optional(
    v.object({
      number: v.number(),
    }),
  ),
  day: v.optional(
    v.object({
      date: v.string(),
    }),
  ),
  season: v.object({
    year: v.number(),
  }),
  events: eventsSchema,
});
