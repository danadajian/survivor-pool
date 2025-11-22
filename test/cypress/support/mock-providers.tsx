import { ClerkProvider } from "@clerk/clerk-react";
import type { InitialState } from "@clerk/types";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter } from "react-router-dom";

import { ClientProvider } from "../../../src/components/client-provider";
import { ErrorPage } from "../../../src/components/error";
import { UserProvider } from "../../../src/components/user-context";

const DEV_PUBLISHABLE_KEY =
  "pk_test_ZHJpdmVuLXNwYXJyb3ctNDguY2xlcmsuYWNjb3VudHMuZGV2JA";
const userData = {
  username: "test@user.com",
  firstName: "Test",
  lastName: "User",
};
const mockClerkState = { user: userData } as InitialState;
const mockUnauthenticatedClerkState = {} as InitialState;
export const MockProviders = ({
  children,
  initialEntries = ["/"],
  authenticated = true,
}: PropsWithChildren & {
  initialEntries?: ComponentProps<typeof MemoryRouter>["initialEntries"];
  authenticated?: boolean;
}) => (
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <ClientProvider>
      <ClerkProvider
        initialState={
          authenticated ? mockClerkState : mockUnauthenticatedClerkState
        }
        publishableKey={DEV_PUBLISHABLE_KEY}
      >
        <UserProvider userData={authenticated ? userData : undefined}>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </UserProvider>
      </ClerkProvider>
    </ClientProvider>
  </ErrorBoundary>
);
