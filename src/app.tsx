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
import { UserData, UserProvider } from "./components/user-context";
import { Create } from "./pages/create/frontend";
import { Edit } from "./pages/edit/frontend";
import { Home } from "./pages/home/frontend";
import { Landing } from "./pages/home/landing";
import { Join } from "./pages/join/frontend";
import { Pool } from "./pages/pool/frontend";
import { Privacy } from "./pages/privacy/frontend";
import { PublicPrivacy } from "./pages/privacy/public-privacy";
import { Rules } from "./pages/rules/frontend";
import { PublicRules } from "./pages/rules/public-rules";
import { Winners } from "./pages/winners/frontend";

type AppProps = {
  userData?: UserData;
  dehydratedState?: unknown;
};

export const App = ({ userData, dehydratedState }: AppProps) => {
  const authenticatedRoutes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/winners" element={<Winners />} />
      <Route path="/pool/:poolId" element={<Pool />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:poolId" element={<Edit />} />
      <Route path="/join/:poolId" element={<Join />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  const publicRoutes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/rules" element={<PublicRules />} />
      <Route path="/privacy" element={<PublicPrivacy />} />
      <Route path="*" element={<RedirectToSignIn />} />
    </Routes>
  );

  // On server: Pass userData via UserProvider for SSR
  // On client: ClerkProvider will hydrate and provide full functionality
  // Use client components for navigation - server components only for initial SSR
  const content = (
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY || ""}>
      <UserProvider userData={userData}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ClientProvider dehydratedState={dehydratedState}>
            <SignedIn>{authenticatedRoutes}</SignedIn>
            <SignedOut>{publicRoutes}</SignedOut>
          </ClientProvider>
        </ErrorBoundary>
      </UserProvider>
    </ClerkProvider>
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <title>Survivor Pool</title>
        {dehydratedState ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__DEHYDRATED_STATE__ = ${JSON.stringify(dehydratedState)};`,
            }}
          />
        ) : null}
      </head>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {content}
      </body>
    </html>
  );
};

const NotFound = withPage(() => <Heading>Page Not Found</Heading>);
