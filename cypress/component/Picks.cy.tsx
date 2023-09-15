import React from "react";
import { Picks } from "../../src/frontend/picks";
import {
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
} from "../../src/backend/mocks";
import { MockProviders } from "../support/mock-clerk-provider";

describe("Picks.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/gamesAndPicks*", {
      body: basicGamesAndPicksResponse,
    });
  });

  it("renders without picks", () => {
    cy.mount(
      <MockProviders>
        <Picks />
      </MockProviders>,
    );

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
    cy.mount(
      <MockProviders>
        <Picks />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /Chiefs/ })
      .should("be.visible")
      .click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByText(/Are you sure you want to pick the Chiefs?/).should(
      "be.visible",
    );
    cy.intercept("/trpc/gamesAndPicks*", {
      body: responseWithPick,
    });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByRole("button", { name: /Chiefs/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the Chiefs this week!",
    }).should("be.visible");
  });

  it("prevents picking the same team twice", () => {
    cy.intercept("/trpc/gamesAndPicks*", {
      body: responseWithPickAndForbiddenTeams,
    });
    cy.mount(
      <MockProviders>
        <Picks />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /Bills/ }).should("be.disabled");
    cy.findByRole("button", { name: /Jets/ }).should("be.disabled");
    cy.findByRole("button", { name: /Chiefs/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the Chiefs this week!",
    }).should("be.visible");
  });
});
