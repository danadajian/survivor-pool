import { initTRPC } from "@trpc/server";
import * as v from "valibot";

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
  fetchPicksForPool,
  fetchPicksForPoolInput,
} from "./pages/picks/backend";
import {
  fetchPicksInput,
  fetchPoolInfo,
  makePick,
  makePickInput,
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
  joinPool: t.procedure
    .input(v.parser(joinPoolInput))
    .mutation(({ input }) => joinPool(input)),
  getPool: t.procedure
    .input(v.parser(getPoolInput))
    .query(({ input }) => getPool(input)),
});

export type AppRouter = typeof appRouter;
