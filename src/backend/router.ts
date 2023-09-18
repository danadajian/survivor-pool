import { initTRPC } from "@trpc/server";
import {
  pickEndpoint,
  fetchPicksInput,
  fetchPoolsForUser,
  fetchPoolsForUserInput,
  makePick,
  makePickInput,
} from "./pages/pick";
import { createPool, createPoolInput } from "./pages/create";
import { joinPool, joinPoolInput } from "./pages/join";
import { fetchPicksForPool, fetchPicksForPoolInput } from "./pages/pools";

const t = initTRPC.create();

export const appRouter = t.router({
  pick: t.procedure
    .input(fetchPicksInput.assert)
    .query(({ input }) => pickEndpoint(input)),
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
