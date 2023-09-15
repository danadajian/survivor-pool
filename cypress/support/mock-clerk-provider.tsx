import { ClerkProvider } from "@clerk/clerk-react";
import React, { type PropsWithChildren } from "react";
import type { InitialState } from "@clerk/types";

const mockClerkState = {
  user: {
    id: "user_123",
    firstName: "Test",
    primaryEmailAddress: {
      emailAddress: "test@user.com",
    },
  },
} as InitialState;
export const MockClerkProvider = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    initialState={mockClerkState}
    publishableKey={Cypress.env("CLERK_PUBLISHABLE_KEY")}
  >
    {children}
  </ClerkProvider>
);
