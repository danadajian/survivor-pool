import { createClerkClient } from "@clerk/backend";

import { CLERK_PUBLISHABLE_KEY } from "./constants";

export async function createContext({ req }: { req: Request }) {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: CLERK_PUBLISHABLE_KEY,
  });
  const { isAuthenticated } = await clerkClient.authenticateRequest(req);

  return { isAuthenticated };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
