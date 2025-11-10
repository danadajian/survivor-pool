import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import { ClientProvider } from "./components/client-provider";
import { ErrorPage } from "./components/error";
import { Heading } from "./components/heading";
import { withPage } from "./components/page-wrapper";
import {
  ServerClerkProvider,
  ServerSignedIn,
  ServerSignedOut,
} from "./components/server-clerk-provider";
import { CLERK_PUBLISHABLE_KEY } from "./constants";
import { Create } from "./pages/create/frontend";
import { Edit } from "./pages/edit/frontend";
import { Home } from "./pages/home/frontend";
import { Join } from "./pages/join/frontend";
import { Picks } from "./pages/picks/frontend";
import { Pool } from "./pages/pool/frontend";
import { Rules } from "./pages/rules/frontend";
import { useEndpoint } from "./utils/use-endpoint";

type AuthState = {
  userId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
};

type AppProps = {
  authState?: AuthState;
};

export const App = ({ authState }: AppProps = {}) => {
  const endpoint = useEndpoint();
  
  // Always use ClerkProvider structure for consistent hydration
  // On the server, authState is used to render the correct content
  // On the client, ClerkProvider will hydrate and take over
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/pool/:poolId" element={<Pool />} />
      <Route path="/picks/:poolId" element={<Picks />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:poolId" element={<Edit />} />
      <Route path="/join/:poolId" element={<Join />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  const content = authState ? (
    // Server-side: Render based on authState without ClerkProvider
    // This allows SSR to work without waiting for client-side auth
    <ServerClerkProvider authState={authState}>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
      >
        <ClientProvider>
          <ServerSignedIn authState={authState}>{routes}</ServerSignedIn>
          <ServerSignedOut authState={authState}>
            <RedirectToSignIn />
          </ServerSignedOut>
        </ClientProvider>
      </ErrorBoundary>
    </ServerClerkProvider>
  ) : (
    // Client-side: Use ClerkProvider for hydration
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
      >
        <ClientProvider>
          <SignedIn>{routes}</SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </ClientProvider>
      </ErrorBoundary>
    </ClerkProvider>
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="og:title"
          content={
            endpoint === "join" ? "Join My Survivor Pool!" : "Survivor Pool"
          }
        />
        <meta
          name="og:image"
          content="https://survivor-pool.up.railway.app/public/og.png"
        />
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="/public/globals.css" />
        <title>Survivor Pool</title>
      </head>
      <body>
        {content}
      </body>
    </html>
  );
};

const NotFound = withPage(() => <Heading>Not Found</Heading>);
