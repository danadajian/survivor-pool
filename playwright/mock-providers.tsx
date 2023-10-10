import { ClerkProvider } from "@clerk/clerk-react";
import type { InitialState } from "@clerk/types";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";

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
  <ClerkProvider
    initialState={mockClerkState}
    publishableKey="pk_test_YW11c2luZy1tYW4tNjEuY2xlcmsuYWNjb3VudHMuZGV2JA"
  >
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  </ClerkProvider>
);
