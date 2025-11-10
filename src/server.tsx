import { createClerkClient } from "@clerk/backend";
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
    const authState = {
      userId: auth?.userId ?? null,
      sessionId: auth?.sessionId ?? null,
      isAuthenticated: authResult.isAuthenticated,
    };

    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App authState={authState} />
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
