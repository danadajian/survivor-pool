import { initTRPC } from "@trpc/server";
import { fetchGames } from "./fetch-games";
import { makePick } from "./db";
import { makePickInput } from "./schema";

const t = initTRPC.create();

export const appRouter = t.router({
  games: t.procedure.query(() => fetchGames()),
  makePick: t.procedure
    .input(makePickInput.assert)
    .mutation(({ input }) => makePick(input)),
});

export type AppRouter = typeof appRouter;
