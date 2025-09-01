import { initTRPC } from "@trpc/server";
import * as v from "valibot";

import { createPool, createPoolInput } from "./pages/create/backend";
import {
  fetchPoolsForUser,
  fetchPoolsForUserInput,
} from "./pages/home/backend";
import {
  getPool,
  joinPool,
  joinPoolInput,
  poolInput,
} from "./pages/join/backend";
import {
  fetchPicksForPool,
  fetchPicksForPoolInput,
} from "./pages/picks/backend";
import {
  deletePool,
  fetchPicksInput,
  fetchPoolInfo,
  makePick,
  makePickInput,
  reactivatePool,
} from "./pages/pool/backend";

const t = initTRPC.create();

export const appRouter = t.router({
  pool: t.procedure
    .input(v.parser(fetchPicksInput))
    .query(({ input }) => fetchPoolInfo(input)),
  makePick: t.procedure
    .input(v.parser(makePickInput))
    .mutation(({ input }) => makePick(input)),
  poolsForUser: t.procedure
    .input(v.parser(fetchPoolsForUserInput))
    .query(({ input }) => fetchPoolsForUser(input)),
  picksForPool: t.procedure
    .input(v.parser(fetchPicksForPoolInput))
    .query(({ input }) => fetchPicksForPool(input)),
  createPool: t.procedure
    .input(v.parser(createPoolInput))
    .mutation(({ input }) => createPool(input)),
  deletePool: t.procedure
    .input(v.parser(poolInput))
    .mutation(({ input }) => deletePool(input)),
  joinPool: t.procedure
    .input(v.parser(joinPoolInput))
    .mutation(({ input }) => joinPool(input)),
  getPool: t.procedure
    .input(v.parser(poolInput))
    .query(({ input }) => getPool(input)),
  reactivatePool: t.procedure
    .input(v.parser(poolInput))
    .mutation(({ input }) => reactivatePool(input)),
});

export type AppRouter = typeof appRouter;
