import { createClerkClient } from "@clerk/backend";

export async function createContext({ req }: { req: Request }) {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  });
  const { isAuthenticated } = await clerkClient.authenticateRequest(req);

  return { isAuthenticated };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
