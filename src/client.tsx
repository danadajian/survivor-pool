import React from "react";
import { hydrateRoot } from "react-dom/client";
import {
    BrowserRouter,
} from "react-router-dom";
import {ClientProvider} from "./components/client-provider";
import {ClientRoutes} from "./routes/client-routes";
import {CLERK_PUBLISHABLE_KEY} from "./constants";
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/react-router";

const root = document.getElementById('root');
if (root) {
    hydrateRoot(
        root,
        <BrowserRouter>
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <ClientProvider>
            <SignedIn>
                <ClientRoutes />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClientProvider>
        </ClerkProvider>
        </BrowserRouter>
    );
}
