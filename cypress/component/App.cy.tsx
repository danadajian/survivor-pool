import { App } from "../../src/frontend/app";
import {
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
} from "../../src/backend/mocks";
import { ClerkProvider } from "@clerk/clerk-react";
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
const AppWithClerkProvider = () => (
  <ClerkProvider
    initialState={mockClerkState}
    publishableKey={Cypress.env("CLERK_PUBLISHABLE_KEY")}
  >
    <App />
  </ClerkProvider>
);

describe("App.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/games*", {
      body: basicGamesAndPicksResponse,
    });
  });

  it("renders without picks", () => {
    cy.mount(<AppWithClerkProvider />);

    cy.findByRole("heading", { name: "Survivor Pool 2023" }).should(
      "be.visible",
    );
    cy.findByRole("heading", { name: "Week 1" }).should("be.visible");
    cy.findByRole("heading", { name: "Make your pick, Test!" }).should(
      "be.visible",
    );
  });

  it("can make a pick", () => {
    cy.intercept("/trpc/makePick*", { body: { result: { data: {} } } }).as(
      "makePick",
    );
    cy.mount(<AppWithClerkProvider />);

    cy.findByRole("button", { name: /Chiefs/ })
      .should("be.visible")
      .click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByText(/Are you sure you want to pick the Chiefs?/).should(
      "be.visible",
    );
    cy.intercept("/trpc/games*", {
      body: responseWithPick,
    });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByRole("button", { name: /Chiefs/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the Chiefs this week!",
    }).should("be.visible");
  });

  it("prevents picking the same team twice", () => {
    cy.intercept("/trpc/games*", {
      body: responseWithPickAndForbiddenTeams,
    });
    cy.mount(<AppWithClerkProvider />);

    cy.findByRole("button", { name: /Bills/ }).should("be.disabled");
    cy.findByRole("button", { name: /Jets/ }).should("be.disabled");
    cy.findByRole("button", { name: /Chiefs/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the Chiefs this week!",
    }).should("be.visible");
  });
});
