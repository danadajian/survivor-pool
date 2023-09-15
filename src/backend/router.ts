import { initTRPC } from "@trpc/server";
import { fetchPoolsForUser, makePick } from "./db";
import { fetchGamesAndPicks } from "./fetch-games";
import { type } from "arktype";

export const fetchGamesAndPicksInput = type({
  username: "string",
});

export const makePickInput = type({
  username: "string",
  teamPicked: "string",
  week: "number",
  season: "number",
  poolId: "number",
});

export const poolsInput = type({
  username: "string",
});

const t = initTRPC.create();

export const appRouter = t.router({
  gamesAndPicks: t.procedure
    .input(fetchGamesAndPicksInput.assert)
    .query(({ input }) => fetchGamesAndPicks(input)),
  makePick: t.procedure
    .input(makePickInput.assert)
    .mutation(({ input }) => makePick(input)),
  pools: t.procedure
    .input(poolsInput.assert)
    .query(({ input }) => fetchPoolsForUser(input)),
});

export type AppRouter = typeof appRouter;
