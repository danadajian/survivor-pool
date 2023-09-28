import cors from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { trpc } from "@elysiajs/trpc";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { App } from "./app";
import { environmentVariables } from "./env";
import { appRouter } from "./router";

await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
  minify: true,
  define: {
    "process.env": JSON.stringify(environmentVariables),
  },
});

const app = new Elysia()
  .get("*", async (context) => {
    const stream = await renderToReadableStream(
      <StaticRouter location={context.path}>
        <App />
      </StaticRouter>,
      {
        bootstrapScripts: ["/public/client.js"],
      },
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(cors())
  .use(rateLimit({ max: 1000 }))
  .use(trpc(appRouter))
  .use(staticPlugin())
  .listen(environmentVariables.PORT ?? 8080);

declare global {
  // eslint-disable-next-line no-var
  var ws: typeof Elysia.arguments;
}
if (environmentVariables.ENVIRONMENT === "development") {
  global.ws?.send("reload");
  app.ws("/ws", {
    open: (ws) => {
      global.ws = ws;
    },
  });
}

// eslint-disable-next-line no-console
console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
