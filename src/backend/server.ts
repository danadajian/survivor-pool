import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { rateLimit } from "elysia-rate-limit";
import { appRouter } from "./router";
import { environmentVariables } from "./env";
import { routes } from "../frontend/routes";

async function renderHtml() {
  return Bun.file("public/index.html").text();
}

const app = new Elysia()
  .use(cors())
  .use(rateLimit({ max: 100 }))
  .use(trpc(appRouter))
  .use(html())
  .use(staticPlugin({ assets: "public", prefix: "/" }))
  .listen(environmentVariables.PORT ?? 8080);

routes.forEach(({ path }) => {
  app.get(path, renderHtml);
});

console.log(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
