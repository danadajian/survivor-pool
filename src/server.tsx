import { createClerkClient } from "@clerk/backend";
import { staticPlugin } from "@elysiajs/static";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Elysia from "elysia";
import { HotModuleReload, hotModuleReload } from "elysia-hot-module-reload";
import { rateLimit } from "elysia-rate-limit";
import { isbot } from "isbot";
import path from "path";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "./app";
import { environmentVariables, isDev } from "./env";
import { appRouter } from "./router";
import { trpcRouter } from "./trpc";
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

const app = new Elysia()
  .get("/health", () => "all good")
  .get(relativePathToGlobalsCss, () => Bun.file("./public/globals.css"))
  .get("*", async (context) => {
    const userAgent = context.request.headers.get("user-agent");
    const requestUrl = new URL(context.request.url);

    if (isbot(userAgent)) {
      return handleBotRequest(requestUrl, context.request.headers);
    }

    const authResult = await clerkClient.authenticateRequest(context.request);

    if (!authResult.isAuthenticated) {
      return redirectToSignIn(authResult, requestUrl);
    }

    const auth = authResult.toAuth();
    const user = await clerkClient.users.getUser(auth.userId);
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
      await prefetchQueriesForRoute(context, userData, queryClient);
    }

    const dehydratedState = dehydrate(queryClient);

    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App userData={userData} dehydratedState={dehydratedState} />
        {dehydratedState ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__DEHYDRATED_STATE__ = ${JSON.stringify(dehydratedState)};`,
            }}
          />
        ) : null}
        {isDev ? null : (
          <link rel="stylesheet" href={relativePathToGlobalsCss} />
        )}
        {isDev && (
          <>
            <script src="https://cdn.tailwindcss.com" />
            <HotModuleReload />
          </>
        )}
      </StaticRouter>,
      {
        bootstrapScripts: [relativePathToBundleFile],
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

logger.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
