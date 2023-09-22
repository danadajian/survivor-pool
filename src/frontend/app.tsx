import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Create } from "./pages/create";
import { Home } from "./pages/home";
import { Join } from "./pages/join";
import { Pick } from "./pages/pick";
import { Pools } from "./pages/pools";

export const App = () => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Survivor Pool</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="/public/globals.css" />
    </head>
    <body>
      <ClerkProvider publishableKey="pk_test_YW11c2luZy1tYW4tNjEuY2xlcmsuYWNjb3VudHMuZGV2JA">
        <SignedIn>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pick/:poolId" element={<Pick />} />
            <Route path="/pools/:poolId" element={<Pools />} />
            <Route path="/create" element={<Create />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </body>
  </html>
);
