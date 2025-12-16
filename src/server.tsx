import { createClerkClient } from "@clerk/backend";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { isbot } from "isbot";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createBunHttpHandler } from "trpc-bun-adapter";
import * as v from "valibot";

import { App } from "./app";
import { userSchema } from "./components/page-wrapper";
import { createContext } from "./context";
import { environmentVariables, isDev, isMockAuth } from "./env";
import { appRouter } from "./router";
import { buildClientAndGetPaths } from "./utils/build-client-and-get-paths";
import { handleBotRequest } from "./utils/handle-bot-request";
import { logger } from "./utils/logger";
import { prefetchQueriesForRoute } from "./utils/prefetch-queries-for-route";
import { redirectToSignIn } from "./utils/redirect-to-sign-in";

const { relativePathToBundleFile, relativePathToGlobalsCss } =
  await buildClientAndGetPaths();

const clerkClient = createClerkClient({
  publishableKey: environmentVariables.CLERK_PUBLISHABLE_KEY,
  secretKey: environmentVariables.CLERK_SECRET_KEY,
});

const trpcHandler = createBunHttpHandler({
  router: appRouter,
  createContext,
  endpoint: "/trpc",
});

const renderApp = async (
  url: URL,
  props: React.ComponentProps<typeof App> = {},
) => {
  const stream = await renderToReadableStream(
    <StaticRouter location={url.pathname}>
      <App {...props} />
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
};

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

    try {
      if (isbot(userAgent)) {
        return handleBotRequest(url, request.headers);
      }

      let userData;

      if (isMockAuth) {
        // Mock authenticated state with hardcoded test values
        const mockUserData = {
          username: "test@example.com",
          firstName: "Test",
          lastName: "User",
        };
        const { success, output: parsedUserData } = v.safeParse(
          userSchema,
          mockUserData,
        );
        if (!success) {
          return new Response("Invalid mock user data", { status: 400 });
        }
        userData = parsedUserData;
      } else {
        // Normal Clerk authentication
        const authResult = await clerkClient.authenticateRequest(request);

        const publicRoutes = ["/", "/rules", "/privacy"];
        const isPublicRoute = publicRoutes.includes(url.pathname);

        if (!authResult.isAuthenticated) {
          return isPublicRoute
            ? await renderApp(url)
            : redirectToSignIn(authResult, url);
        }

        const user = await clerkClient.users.getUser(
          authResult.toAuth().userId,
        );
        const { success, output: parsedUserData } = v.safeParse(userSchema, {
          username: user?.primaryEmailAddress?.emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName,
        });
        if (!success) {
          return new Response("Invalid user data", { status: 400 });
        }
        userData = parsedUserData;
      }

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minute
          },
        },
      });
      await prefetchQueriesForRoute(request, userData, queryClient);
      const dehydratedState = dehydrate(queryClient);

      return await renderApp(url, { userData, dehydratedState, isMockAuth });
    } catch (error) {
      logger.error({ error }, "An error occurred while rendering the app");
      return await renderApp(url);
    }
  },
});

logger.info(`App is running at http://${server.hostname}:${server.port}`);
