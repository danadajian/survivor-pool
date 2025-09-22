import { createTRPCReact } from "@trpc/react-query";
import type { AnyRouter, inferRouterOutputs } from "@trpc/server";
import {
  type FetchHandlerRequestOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { type Elysia } from "elysia";

import { createContext } from "./context";
import { type AppRouter } from "./router";

export const trpc = createTRPCReact<AppRouter>();

export type RouterOutput = inferRouterOutputs<AppRouter>;

type TRPCOptions = {
  endpoint?: string;
} & Omit<FetchHandlerRequestOptions<AnyRouter>, "req" | "router" | "endpoint">;

export const trpcRouter =
  (
    router: AnyRouter,
    { endpoint = "/trpc", ...options }: TRPCOptions = { endpoint: "/trpc" },
  ) =>
  (app: Elysia) => {
    return app
      .get(
        `${endpoint}/*`,
        async ({ request }) => {
          return fetchRequestHandler({
            ...options,
            req: request,
            createContext,
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
            ...options,
            req: request,
            createContext,
            router,
            endpoint,
          });
        },
        { parse: "none" },
      );
  };
