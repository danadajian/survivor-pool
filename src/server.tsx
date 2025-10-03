import { staticPlugin } from "@elysiajs/static";
import Elysia from "elysia";
import { HotModuleReload, hotModuleReload } from "elysia-hot-module-reload";
import { rateLimit } from "elysia-rate-limit";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import {
    createRoutesFromElements,
    createStaticHandler, createStaticRouter,
    StaticHandlerContext, StaticRouter,
    StaticRouterProvider
} from "react-router-dom";

import {App} from "./app";
import { environmentVariables } from "./env";
import { appRouter } from "./router";
import { trpcRouter } from "./trpc";
import {ClientProvider} from "./components/client-provider";
import {ServerRoutes} from "./routes/server-routes";
import {CLERK_PUBLISHABLE_KEY} from "./constants";
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/react-router";

await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
  target: "browser",
  minify: true
});

const isDev = environmentVariables.ENVIRONMENT === "development";

const app = new Elysia()
  .get("/health", () => "all good")
  .get("*", async (context) => {
    const stream = await renderToReadableStream(
        <App>
            <StaticRouter location={context.path}>
                <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
                <ClientProvider>
                    <SignedIn>
                    <ServerRoutes />
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                </ClientProvider>
                </ClerkProvider>
            </StaticRouter>
        </App>
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
