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
import { Create } from "./pages/create/frontend";
import { Home } from "./pages/home/frontend";
import { Join } from "./pages/join/frontend";
import { Pick } from "./pages/pick/frontend";
import { Picks } from "./pages/picks/frontend";
import { useEndpoint } from "./utils/use-endpoint";

export const App = () => {
  const endpoint = useEndpoint();
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
        <ClerkProvider publishableKey="pk_test_ZHJpdmVuLXNwYXJyb3ctNDguY2xlcmsuYWNjb3VudHMuZGV2JA">
          <ErrorBoundary
            fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
          >
            <ClientProvider>
              <SignedIn>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pick/:poolId" element={<Pick />} />
                  <Route path="/picks/:poolId" element={<Picks />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/join/:poolId" element={<Join />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </ClientProvider>
          </ErrorBoundary>
        </ClerkProvider>
      </body>
    </html>
  );
};

const NotFound = withPage(() => <Heading>Not Found</Heading>);
