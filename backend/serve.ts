import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { appRouter } from "./router";

const app = new Elysia().use(cors()).use(trpc(appRouter)).listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
