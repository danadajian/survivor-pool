import cors from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { trpc } from "@elysiajs/trpc";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { App } from "../frontend/app";
import { environmentVariables } from "./env";
import { appRouter } from "./router";

await Bun.build({
  entrypoints: ["./src/frontend/main.tsx"],
  outdir: "./public",
  minify: true,
});

const app = new Elysia()
  .use(cors())
  .use(rateLimit({ max: 1000 }))
  .use(trpc(appRouter))
  .use(staticPlugin())
  .get("*", async (context) => {
    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App />
      </StaticRouter>,
      {
        bootstrapScripts: ["/public/main.js"],
      },
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .listen(environmentVariables.PORT ?? 8080);

console.log(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);