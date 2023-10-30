import { initTRPC } from "@trpc/server";

import { createPool, createPoolInput } from "./pages/create/backend";
import {
  fetchPoolsForUser,
  fetchPoolsForUserInput,
} from "./pages/home/backend";
import {
  getPool,
  getPoolInput,
  joinPool,
  joinPoolInput,
} from "./pages/join/backend";
import {
  fetchPicksInput,
  makePick,
  makePickInput,
  pickEndpoint,
} from "./pages/pick/backend";
import {
  fetchPicksForPool,
  fetchPicksForPoolInput,
} from "./pages/pools/backend";

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
  getPool: t.procedure
    .input(getPoolInput.assert)
    .query(({ input }) => getPool(input)),
});

export type AppRouter = typeof appRouter;
