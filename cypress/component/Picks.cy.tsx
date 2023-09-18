import React from "react";
import { Pick } from "../../src/frontend/pages/pick";
import {
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
} from "../../src/backend/mocks";
import { MockProviders } from "../support/mock-clerk-provider";

describe("Picks.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/pick*", {
      body: basicGamesAndPicksResponse,
    });
  });

  it("renders without picks", () => {
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
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
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /Chiefs/ })
      .should("be.visible")
      .click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByText(/Are you sure you want to pick the Chiefs?/).should(
      "be.visible",
    );
    cy.intercept("/trpc/pick*", {
      body: responseWithPick,
    });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByRole("button", { name: /Chiefs/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the Chiefs this week!",
    }).should("be.visible");
  });

  it("prevents picking the same team twice", () => {
    cy.intercept("/trpc/pick*", {
      body: responseWithPickAndForbiddenTeams,
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
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
