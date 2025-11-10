import { createClerkClient } from "@clerk/backend";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { staticPlugin } from "@elysiajs/static";
import Elysia from "elysia";
import { HotModuleReload, hotModuleReload } from "elysia-hot-module-reload";
import { rateLimit } from "elysia-rate-limit";
import path from "path";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "./app";
import { CLERK_PUBLISHABLE_KEY } from "./constants";
import { createContext } from "./context";
import { environmentVariables } from "./env";
import { appRouter } from "./router";
import { trpcRouter } from "./trpc";

const { outputs } = await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
  minify: true,
  naming: "[dir]/[name]-[hash].[ext]",
});
const pathToBundleFile = outputs[0]?.path;
if (!pathToBundleFile) throw new Error("Path to bundle file is missing.");
const bundleFilePath = path.basename(pathToBundleFile);

const isDev = environmentVariables.ENVIRONMENT === "development";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: CLERK_PUBLISHABLE_KEY,
});

const app = new Elysia()
  .get("/health", () => "all good")
  .get("*", async (context) => {
    // Authenticate the request on the server
    const authResult = await clerkClient.authenticateRequest(context.request);

    // Extract auth state for SSR using toAuth() method
    const auth = authResult.toAuth();
    
    // Get user data if authenticated
    let userData = null;
    if (authResult.isAuthenticated && auth?.userId) {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        userData = {
          username: user.primaryEmailAddress?.emailAddress ?? "",
          firstName: user.firstName ?? undefined,
          lastName: user.lastName ?? undefined,
        };
      } catch (error) {
        // If we can't fetch user, continue without user data
        console.error("Failed to fetch user data:", error);
      }
    }
    
    const authState = {
      userId: auth?.userId ?? null,
      sessionId: auth?.sessionId ?? null,
      isAuthenticated: authResult.isAuthenticated,
      signInUrl: authResult.signInUrl,
      userData,
    };

    // Create server-side QueryClient and tRPC caller for prefetching
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
        },
      },
    });

    // Create tRPC caller for server-side queries
    const trpcContext = await createContext({ req: context.request });
    const caller = appRouter.createCaller(trpcContext);

    // Prefetch queries based on the route
    if (authResult.isAuthenticated && userData) {
      const pathname = new URL(context.request.url).pathname;
      
      try {
        // Prefetch based on route
        if (pathname === "/" || pathname === "") {
          // Home page - fetch pools for user
          await queryClient.prefetchQuery({
            queryKey: [
              ["poolsForUser"],
              { input: { username: userData.username }, type: "query" },
            ],
            queryFn: async () => {
              return await caller.poolsForUser({ username: userData.username });
            },
          });
        } else if (pathname.startsWith("/pool/")) {
          // Pool page - extract poolId and fetch pool info
          const poolId = pathname.split("/pool/")[1]?.split("/")[0];
          if (poolId) {
            await queryClient.prefetchQuery({
              queryKey: [
                ["pool"],
                { input: { username: userData.username, poolId }, type: "query" },
              ],
              queryFn: async () => {
                return await caller.pool({ username: userData.username, poolId });
              },
            });
          }
        } else if (pathname.startsWith("/picks/")) {
          // Picks page - extract poolId and fetch picks
          const poolId = pathname.split("/picks/")[1]?.split("/")[0];
          if (poolId) {
            await queryClient.prefetchQuery({
              queryKey: [
                ["picksForPool"],
                { input: { poolId }, type: "query" },
              ],
              queryFn: async () => {
                return await caller.picksForPool({ poolId });
              },
            });
          }
        }
      } catch (error) {
        // If prefetching fails, continue without prefetched data
        console.error("Failed to prefetch queries:", error);
      }
    }

    // Dehydrate the query client state using React Query's dehydrate function
    const dehydratedState = dehydrate(queryClient);

    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App authState={authState} dehydratedState={dehydratedState} />
        {isDev && (
          <>
            <script src="https://cdn.tailwindcss.com" />
            <HotModuleReload />
          </>
        )}
      </StaticRouter>,
      {
        bootstrapScripts: [`/public/${bundleFilePath}`],
        onError: () => {},
      },
    );
    return new Response(stream.pipeThrough(new TransformStream()), {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(rateLimit({ max: 100 }))
  .use(trpcRouter(appRouter))
  .use(staticPlugin())
  .listen(environmentVariables.PORT ?? 8080);

if (isDev) {
  app.use(hotModuleReload());
}

// eslint-disable-next-line no-console
console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
