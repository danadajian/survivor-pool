import { initTRPC } from "@trpc/server";
import { fetchGames } from "./fetch-games";

const t = initTRPC.create();

export const appRouter = t.router({
  games: t.procedure.query(() => fetchGames()),
});

export type AppRouter = typeof appRouter;
