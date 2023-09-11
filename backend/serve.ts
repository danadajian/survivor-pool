import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { appRouter } from "./router";

const app = new Elysia()
  .use(cors())
  .use(trpc(appRouter))
  .use(html())
  .use(staticPlugin({ assets: "dist", prefix: "/" }))
  .get("/", () => Bun.file("dist/index.html").text())
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
