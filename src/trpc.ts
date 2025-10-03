import type { AnyRouter, inferRouterOutputs } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type Elysia } from "elysia";

import { createTRPCContext} from "./context";
import {appRouter, type AppRouter, createCallerFactory} from "./router";
import {cache} from "react";
import {makeQueryClient} from "./trpc-client-factory";
import {createHydrationHelpers} from "@trpc/react-query/rsc";

export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpcRouter = (router: AnyRouter) => (app: Elysia) => {
  const endpoint = "trpc";
  return app
    .get(
      `${endpoint}/*`,
      async ({ request }) => {
        return fetchRequestHandler({
          req: request,
          createContext: createTRPCContext,
          router,
          endpoint,
        });
      },
      { parse: "none" },
    )
    .post(
      `${endpoint}/*`,
      async ({ request }) => {
        return fetchRequestHandler({
          req: request,
          createContext: createTRPCContext,
          router,
          endpoint,
        });
      },
      { parse: "none" },
    );
};

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<typeof appRouter>(
    caller,
    getQueryClient,
);
