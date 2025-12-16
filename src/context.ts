import { createClerkClient } from "@clerk/backend";

import { isMockAuth } from "./env";

export async function createContext({ req }: { req: Request }) {
  if (isMockAuth) {
    return { isAuthenticated: true };
  }

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  });
  const { isAuthenticated } = await clerkClient.authenticateRequest(req);

  return { isAuthenticated };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
