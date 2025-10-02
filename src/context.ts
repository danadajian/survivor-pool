import { createClerkClient } from "@clerk/backend";
import {MaybePromise} from "bun";
import {cache} from "react";

import { CLERK_PUBLISHABLE_KEY } from "./constants";

export const createTRPCContext = cache(async () => {
    // const req = getSession()
    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: CLERK_PUBLISHABLE_KEY,
    });
    // const { isAuthenticated } = await clerkClient.authenticateRequest(req);

    return { isAuthenticated: true };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
