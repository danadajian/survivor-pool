import { ClerkProvider } from "@clerk/clerk-react";
import type { InitialState } from "@clerk/types";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";

import { ClientProvider } from "../../src/components/client-provider";
import { CLERK_PUBLISHABLE_KEY } from "../../src/constants";

const mockClerkState = {
  user: {
    id: "user_123",
    firstName: "Test",
    lastName: "User",
    primaryEmailAddress: {
      emailAddress: "test@user.com",
    },
  },
} as InitialState;
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
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </ClerkProvider>
  </ClientProvider>
);
