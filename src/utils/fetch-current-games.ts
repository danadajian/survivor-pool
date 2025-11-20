import { TRPCError } from "@trpc/server";
import * as v from "valibot";

import { environmentVariables } from "../env";
import { logger } from "./logger";

export async function fetchCurrentGames(): Promise<GamesResponse> {
  if (!environmentVariables.GAMES_API_URL) {
    throw new Error("GAMES_API_URL is required");
  }
  const response = await fetch(environmentVariables.GAMES_API_URL);
  const games = await response.json();
  const parseResult = v.safeParse(gamesSchema, games);
  if (!parseResult.success) {
    logger.error(
      { issues: parseResult.issues },
      "Failed to validate games response from API.",
    );
    throw new TRPCError({
      message: "ESPN has changed their API recently, an update is needed.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
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
  week: v.object({
    number: v.number(),
  }),
  season: v.object({
    year: v.number(),
  }),
  events: eventsSchema,
});
