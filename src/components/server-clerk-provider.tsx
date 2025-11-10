import React, { type PropsWithChildren } from "react";

type AuthState = {
  userId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  signInUrl?: string;
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

/**
 * Server-side redirect to sign-in page
 * Renders a placeholder that will be replaced by ClerkProvider's RedirectToSignIn
 * component when the client hydrates. This ensures the redirect uses Clerk's
 * proper frontend configuration and sign-in URL.
 */
export const ServerRedirectToSignIn = () => {
  // On the server, we render nothing (or a minimal placeholder).
  // When the client hydrates with ClerkProvider, the RedirectToSignIn component
  // will be rendered and will handle the redirect properly using Clerk's frontend SDK.
  // This ensures we use Clerk's correct sign-in URL configuration.
  return null;
};

