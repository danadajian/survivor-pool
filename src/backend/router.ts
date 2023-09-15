import { initTRPC } from "@trpc/server";
import {
  createPool,
  fetchPicksForPool,
  fetchPoolsForUser,
  joinPool,
  makePick,
} from "./db";
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

export const fetchPoolsForUserInput = type({
  username: "string",
});

export const fetchPicksForPoolInput = type({
  poolId: "number",
});

export const createPoolInput = type({
  name: "string",
  creator: "string",
});

export const joinPoolInput = type({
  username: "string",
  poolId: "number",
});

const t = initTRPC.create();

export const appRouter = t.router({
  gamesAndPicks: t.procedure
    .input(fetchGamesAndPicksInput.assert)
    .query(({ input }) => fetchGamesAndPicks(input)),
  makePick: t.procedure
    .input(makePickInput.assert)
    .mutation(({ input }) => makePick(input)),
  poolsForUser: t.procedure
    .input(fetchPoolsForUserInput.assert)
    .query(({ input }) => fetchPoolsForUser(input)),
  picksForPool: t.procedure
    .input(fetchPicksForPoolInput.assert)
    .query(({ input }) => fetchPicksForPool(input)),
  createPool: t.procedure
    .input(createPoolInput.assert)
    .mutation(({ input }) => createPool(input)),
  joinPool: t.procedure
    .input(joinPoolInput.assert)
    .mutation(({ input }) => joinPool(input)),
});

export type AppRouter = typeof appRouter;
