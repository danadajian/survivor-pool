import { ClerkProvider } from "@clerk/clerk-react";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import type { InitialState } from "@clerk/types";
import { MemoryRouter } from "react-router-dom";

const mockClerkState = {
  user: {
    id: "user_123",
    firstName: "Test",
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
  <ClerkProvider
    initialState={mockClerkState}
    publishableKey={Cypress.env("CLERK_PUBLISHABLE_KEY")}
  >
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  </ClerkProvider>
);
