import {defaultShouldDehydrateQuery, keepPreviousData, QueryClient} from "@tanstack/react-query";
import {createHydrationHelpers} from "@trpc/react-query/rsc";
import type { AnyRouter, inferRouterOutputs } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type Elysia } from "elysia";
import {cache} from "react";

import { createTRPCContext} from "./context";
import {type AppRouter, appRouter, createCallerFactory} from "./router";

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

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                placeholderData: keepPreviousData,
                staleTime: 1000 * 60, // 1 minute
                throwOnError: true,
                retry: false,
            },
            mutations: {
                throwOnError: true,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    });
}

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
    caller,
    getQueryClient,
);
