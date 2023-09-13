import { initTRPC } from "@trpc/server";
import { makePick } from "./db";
import { fetchGamesAndPick } from "./fetch-games";
import { type } from "arktype";

export const makePickInput = type({
  username: "string",
  teamPicked: "string",
  week: "number",
  season: "number",
});

export const fetchGamesAndPicksInput = type({
  username: "string",
});

const t = initTRPC.create();

export const appRouter = t.router({
  gamesAndPick: t.procedure
    .input(fetchGamesAndPicksInput.assert)
    .query(({ input }) => fetchGamesAndPick(input)),
  makePick: t.procedure
    .input(makePickInput.assert)
    .mutation(({ input }) => makePick(input)),
});

export type AppRouter = typeof appRouter;
