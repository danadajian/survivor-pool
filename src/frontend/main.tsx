/// <reference lib="dom" />
/// <reference types="vite/client" />

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./globals.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={
        process.env.CLERK_PUBLISHABLE_KEY ??
        import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
      }
    >
      <SignedIn>
        <App />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  </React.StrictMode>,
);
