import { ClerkProvider } from "@clerk/clerk-react";
import type { InitialState } from "@clerk/types";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";

import { ClientProvider } from "../../src/components/client-provider";
import { UserProvider } from "../../src/components/user-context";
import { CLERK_PUBLISHABLE_KEY } from "../../src/constants";

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
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <UserProvider userData={userData}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </UserProvider>
    </ClerkProvider>
  </ClientProvider>
);
