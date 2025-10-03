import {cache} from "react";
import {appRouter, createCallerFactory} from "./router";
import {createTRPCContext} from "./context";
import {createHydrationHelpers} from "@trpc/react-query/rsc";
import {makeQueryClient} from "./trpc-client-factory";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc: trpcServer } = createHydrationHelpers<typeof appRouter>(
    caller,
    getQueryClient,
);
