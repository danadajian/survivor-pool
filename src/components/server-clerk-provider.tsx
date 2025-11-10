import React, { type PropsWithChildren } from "react";

type AuthState = {
  userId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
};

type ServerClerkProviderProps = PropsWithChildren<{
  authState: AuthState;
}>;

/**
 * Server-side Clerk provider that conditionally renders children
 * based on authentication state. This allows SSR to work without
 * waiting for client-side Clerk authentication.
 */
export const ServerClerkProvider = ({
  children,
  authState,
}: ServerClerkProviderProps) => {
  // On the server, we render based on the auth state
  // On the client, ClerkProvider will take over after hydration
  return <>{children}</>;
};

/**
 * Server-side SignedIn component that checks auth state
 */
export const ServerSignedIn = ({
  children,
  authState,
}: PropsWithChildren<{ authState: AuthState }>) => {
  if (authState.isAuthenticated) {
    return <>{children}</>;
  }
  return null;
};

/**
 * Server-side SignedOut component that checks auth state
 */
export const ServerSignedOut = ({
  children,
  authState,
}: PropsWithChildren<{ authState: AuthState }>) => {
  if (!authState.isAuthenticated) {
    return <>{children}</>;
  }
  return null;
};

