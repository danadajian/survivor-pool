import { staticPlugin } from "@elysiajs/static";
import { trpc } from "@elysiajs/trpc";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { App } from "./app";
import { environmentVariables } from "./env";
import { hmrPlugin, HmrScript } from "./hmr/plugin";
import { appRouter } from "./router";

await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
  minify: true,
});

const isDev = environmentVariables.ENVIRONMENT === "development";

const app = new Elysia()
  .get("*", async (context) => {
    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App />
        {isDev && (
          <>
            <script src="https://cdn.tailwindcss.com" />
            <HmrScript />
          </>
        )}
      </StaticRouter>,
      {
        bootstrapScripts: ["/public/client.js"],
      },
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(rateLimit({ max: 1000 }))
  .use(trpc(appRouter))
  .use(staticPlugin())
  .listen(environmentVariables.PORT ?? 8080);

if (isDev) {
  app.use(hmrPlugin());
}

// eslint-disable-next-line no-console
console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
