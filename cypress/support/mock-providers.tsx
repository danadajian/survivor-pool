import { ClerkProvider } from "@clerk/clerk-react";
import type { InitialState } from "@clerk/types";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";

import { ClientProvider } from "../../src/components/client-provider";
import { UserProvider } from "../../src/components/user-context";

const DEV_PUBLISHABLE_KEY =
  "pk_test_ZHJpdmVuLXNwYXJyb3ctNDguY2xlcmsuYWNjb3VudHMuZGV2JA";
const userData = {
  username: "test@user.com",
  firstName: "Test",
  lastName: "User",
};
const mockClerkState = { user: userData } as InitialState;
export const MockProviders = ({
  children,
  initialEntries = ["/"],
}: PropsWithChildren & {
  initialEntries?: ComponentProps<typeof MemoryRouter>["initialEntries"];
}) => (
  <ClientProvider>
    <ClerkProvider
      initialState={mockClerkState}
      publishableKey={DEV_PUBLISHABLE_KEY}
    >
      <UserProvider userData={userData ?? null}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </UserProvider>
    </ClerkProvider>
  </ClientProvider>
);
