import cors from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { trpc } from "@elysiajs/trpc";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";

import { routes } from "../frontend/routes";
import { environmentVariables } from "./env";
import { appRouter } from "./router";

const app = new Elysia()
  .use(cors())
  .use(rateLimit({ max: 1000 }))
  .use(trpc(appRouter))
  .use(html())
  .use(staticPlugin({ assets: "public", prefix: "/" }))
  .listen(environmentVariables.PORT ?? 8080);

async function renderHtml() {
  return Bun.file("public/index.html").text();
}

routes.forEach(({ path }) => {
  app.get(path, renderHtml);
});

console.log(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
