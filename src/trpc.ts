import { createTRPCReact } from "@trpc/react-query";
import type { AnyRouter, inferRouterOutputs } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type Elysia } from "elysia";

import { createContext } from "./context";
import { type AppRouter } from "./router";

export const trpc = createTRPCReact<AppRouter>();

export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpcRouter = (router: AnyRouter) => (app: Elysia) => {
  const endpoint = "trpc";
  return app
    .get(
      `${endpoint}/*`,
      async ({ request }) => {
        return fetchRequestHandler({
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
          req: request,
          createContext,
          router,
          endpoint,
        });
      },
      { parse: "none" },
    );
};
