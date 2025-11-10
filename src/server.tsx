import { createClerkClient } from "@clerk/backend";
import { staticPlugin } from "@elysiajs/static";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Elysia from "elysia";
import { HotModuleReload, hotModuleReload } from "elysia-hot-module-reload";
import { rateLimit } from "elysia-rate-limit";
import path from "path";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "./app";
import { UserData } from "./components/user-context";
import { CLERK_PUBLISHABLE_KEY } from "./constants";
import { createContext } from "./context";
import { environmentVariables } from "./env";
import { appRouter } from "./router";
import { trpcRouter } from "./trpc";
import { parseRoute } from "./utils/parse-route";

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

/**
 * Prefetches tRPC queries based on the current route
 * Uses the same route parsing logic as page-wrapper.tsx
 */
async function prefetchQueriesForRoute(
  pathname: string,
  userData: UserData,
  caller: ReturnType<typeof appRouter.createCaller>,
  queryClient: QueryClient,
) {
  const { endpoint, poolId } = parseRoute(pathname);

  // Home page - fetch pools for user
  if (!endpoint) {
    await queryClient.prefetchQuery({
      queryKey: [
        ["poolsForUser"],
        { input: { username: userData.username }, type: "query" },
      ],
      queryFn: () => caller.poolsForUser({ username: userData.username }),
    });
    return;
  }

  if (!poolId) return;

  if (endpoint === "pool") {
    await queryClient.prefetchQuery({
      queryKey: [
        ["pool"],
        { input: { username: userData.username, poolId }, type: "query" },
      ],
      queryFn: () => caller.pool({ username: userData.username, poolId }),
    });
  } else if (endpoint === "picks") {
    await queryClient.prefetchQuery({
      queryKey: [["picksForPool"], { input: { poolId }, type: "query" }],
      queryFn: () => caller.picksForPool({ poolId }),
    });
  }
}

const app = new Elysia()
  .get("/health", () => "all good")
  .get("*", async (context) => {
    const authResult = await clerkClient.authenticateRequest(context.request);
    const auth = authResult.toAuth();

    let userData;
    if (authResult.isAuthenticated && auth?.userId) {
      const user = await clerkClient.users.getUser(auth.userId);
      userData = {
        username: user.primaryEmailAddress?.emailAddress ?? "",
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
      };
    }

    // Create tRPC caller for server-side queries
    const trpcContext = await createContext({ req: context.request });
    const caller = appRouter.createCaller(trpcContext);

    // Create server-side QueryClient and tRPC caller for prefetching
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
        },
      },
    });

    // Prefetch queries based on the route
    if (authResult.isAuthenticated && userData) {
      const pathname = new URL(context.request.url).pathname;
      await prefetchQueriesForRoute(pathname, userData, caller, queryClient);
    }

    // Dehydrate the query client state using React Query's dehydrate function
    const dehydratedState = dehydrate(queryClient);

    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App userData={userData} dehydratedState={dehydratedState} />
        {isDev && (
          <>
            <script src="https://cdn.tailwindcss.com" />
            <HotModuleReload />
          </>
        )}
      </StaticRouter>,
      {
        bootstrapScripts: [`/public/${bundleFilePath}`],
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
