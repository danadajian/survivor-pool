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
import { CLERK_PUBLISHABLE_KEY } from "./constants";
import { environmentVariables } from "./env";
import { appRouter } from "./router";
import { trpcRouter } from "./trpc";
import { prefetchQueriesForRoute } from "./utils/prefetch-queries-for-route";

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

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
        },
      },
    });

    if (authResult.isAuthenticated && userData) {
      await prefetchQueriesForRoute(context, userData, queryClient);
    }

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
