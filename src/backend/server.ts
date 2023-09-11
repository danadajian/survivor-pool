import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { appRouter } from "./router";

const app = new Elysia();

app
  .use(cors())
  .use(trpc(appRouter))
  .use(html())
  .use(staticPlugin({ assets: "public", prefix: "/" }))
  .get("/", () => Bun.file("public/index.html").text())
  .listen(process.env.PORT ?? 8080);

console.log(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
