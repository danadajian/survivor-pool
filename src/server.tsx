import { createClerkClient } from "@clerk/backend";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { isbot } from "isbot";
import path from "path";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createBunHttpHandler } from "trpc-bun-adapter";

import { App } from "./app";
import { createContext } from "./context";
import { environmentVariables, isDev } from "./env";
import { appRouter } from "./router";
import { handleBotRequest } from "./utils/handle-bot-request";
import { logger } from "./utils/logger";
import { prefetchQueriesForRoute } from "./utils/prefetch-queries-for-route";
import { redirectToSignIn } from "./utils/redirect-to-sign-in";

const { outputs } = await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
  minify: true,
  naming: "[dir]/[name]-[hash].[ext]",
  define: {
    "process.env.CLERK_PUBLISHABLE_KEY": JSON.stringify(
      environmentVariables.CLERK_PUBLISHABLE_KEY,
    ),
  },
});
const absolutePathToBundleFile = outputs[0]?.path;
if (!absolutePathToBundleFile)
  throw new Error("Path to bundle file is missing.");
const relativePathToBundleFile = `/${path.relative(process.cwd(), absolutePathToBundleFile).replace(/\\/g, "/")}`;
const bundleHashMatch = relativePathToBundleFile.match(
  /-(?<hash>[^./]+)\.[^.]+$/,
);
const bundleHash = bundleHashMatch?.groups?.hash ?? bundleHashMatch?.[1];
const relativePathToGlobalsCss = bundleHash
  ? `/public/globals-${bundleHash}.css`
  : "/public/globals.css";

const clerkClient = createClerkClient({
  publishableKey: environmentVariables.CLERK_PUBLISHABLE_KEY,
  secretKey: environmentVariables.CLERK_SECRET_KEY,
});

const trpcHandler = createBunHttpHandler({
  router: appRouter,
  createContext,
  endpoint: "/trpc",
});

const server = Bun.serve({
  port: environmentVariables.PORT ?? 8080,
  routes: {
    "/health": new Response("all good"),
    [relativePathToGlobalsCss]: new Response(Bun.file("./public/globals.css")),
    "/public/*": async (request) => {
      const url = new URL(request.url);
      const filePath = `.${url.pathname}`;
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }
      return new Response("Not Found", { status: 404 });
    },
    "/trpc/*": async (request, server) => {
      const res = await trpcHandler(request, server);
      return res ?? new Response("Not Found", { status: 404 });
    },
  },
  async fetch(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent");

    if (isbot(userAgent)) {
      return handleBotRequest(url, request.headers);
    }

    const authResult = await clerkClient.authenticateRequest(request);
    if (!authResult.isAuthenticated) {
      return redirectToSignIn(authResult, url);
    }

    const user = await clerkClient.users.getUser(authResult.toAuth().userId);
    const userData = {
      username: user.primaryEmailAddress?.emailAddress ?? "",
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
    };

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
        },
      },
    });

    if (authResult.isAuthenticated && userData) {
      await prefetchQueriesForRoute(request, userData, queryClient);
    }

    const dehydratedState = dehydrate(queryClient);

    const stream = await renderToReadableStream(
      <StaticRouter location={url.pathname}>
        <App userData={userData} dehydratedState={dehydratedState} />
        {dehydratedState ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__DEHYDRATED_STATE__ = ${JSON.stringify(dehydratedState)};`,
            }}
          />
        ) : null}
        {isDev ? (
          <script src="https://cdn.tailwindcss.com" />
        ) : (
          <link rel="stylesheet" href={relativePathToGlobalsCss} />
        )}
      </StaticRouter>,
      {
        bootstrapScripts: [relativePathToBundleFile],
      },
    );
    return new Response(stream.pipeThrough(new TransformStream()), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

logger.info(`App is running at http://${server.hostname}:${server.port}`);
