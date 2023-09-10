import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../backend/router";
import type { inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>();

export type RouterOutput = inferRouterOutputs<AppRouter>;
