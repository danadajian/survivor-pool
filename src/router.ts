import { initTRPC, TRPCError } from "@trpc/server";
import * as v from "valibot";

import { Context } from "./context";
import { createPool, createPoolInput } from "./pages/create/backend";
import { editPool, editPoolInput } from "./pages/edit/backend";
import {
  deletePool,
  fetchPoolsForUser,
  fetchPoolsForUserInput,
} from "./pages/home/backend";
import {
  getPool,
  joinPool,
  joinPoolInput,
  poolInput,
} from "./pages/join/backend";
import { fetchPoolInfo, fetchPoolInfoInput } from "./pages/pool/backend";
import { makePick, makePickInput } from "./pages/pool/backend/make-pick";
import {
  fetchPicksForWeek,
  fetchPicksForWeekInput,
  fetchPoolMemberLivesRemaining,
  fetchPoolMemberLivesRemainingInput,
} from "./pages/pool/backend/picks";
import {
  reactivatePool,
  reactivatePoolInput,
} from "./pages/pool/backend/reactivate-pool";
import {
  fetchPoolWinners,
  fetchPoolWinnersInput,
} from "./pages/winners/backend";

const t = initTRPC.context<Context>().create();

const authenticatedProcedure = t.procedure.use(async function isAuthed(opts) {
  if (!opts.ctx.isAuthenticated) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({ ctx: {} });
});

export const appRouter = t.router({
  pool: authenticatedProcedure
    .input(v.parser(fetchPoolInfoInput))
    .query(({ input }) => fetchPoolInfo(input)),
  makePick: authenticatedProcedure
    .input(v.parser(makePickInput))
    .mutation(({ input }) => makePick(input)),
  poolsForUser: authenticatedProcedure
    .input(v.parser(fetchPoolsForUserInput))
    .query(({ input }) => fetchPoolsForUser(input)),
  poolMemberLivesRemaining: authenticatedProcedure
    .input(v.parser(fetchPoolMemberLivesRemainingInput))
    .query(({ input }) => fetchPoolMemberLivesRemaining(input)),
  picksForWeek: authenticatedProcedure
    .input(v.parser(fetchPicksForWeekInput))
    .query(({ input }) => fetchPicksForWeek(input)),
  createPool: authenticatedProcedure
    .input(v.parser(createPoolInput))
    .mutation(({ input }) => createPool(input)),
  editPool: authenticatedProcedure
    .input(v.parser(editPoolInput))
    .mutation(({ input }) => editPool(input)),
  deletePool: authenticatedProcedure
    .input(v.parser(poolInput))
    .mutation(({ input }) => deletePool(input)),
  joinPool: authenticatedProcedure
    .input(v.parser(joinPoolInput))
    .mutation(({ input }) => joinPool(input)),
  getPool: authenticatedProcedure
    .input(v.parser(poolInput))
    .query(({ input }) => getPool(input)),
  reactivatePool: authenticatedProcedure
    .input(v.parser(reactivatePoolInput))
    .mutation(({ input }) => reactivatePool(input)),
  winners: authenticatedProcedure
    .input(v.parser(fetchPoolWinnersInput))
    .query(({ input }) => fetchPoolWinners(input)),
});

export type AppRouter = typeof appRouter;
