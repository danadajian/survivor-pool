import React from "react";

import { Pool } from "../../src/pages/pool/frontend";
import {
  basicGamesAndPicksPreseasonResponse,
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithSecretPick,
} from "../../test/mocks";
import { MockProviders } from "../support/mock-providers";

describe("picks page", () => {
  beforeEach(() => {
    cy.intercept("/trpc/pool*", { body: basicGamesAndPicksResponse });
  });

  it("renders without picks", () => {
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pool />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Test Pool 2023" }).should("be.visible");
    cy.findByRole("heading", { name: "Week 1" }).should("be.visible");
    cy.findByRole("heading", { name: "Make your pick, Test!" }).should(
      "be.visible",
    );
    cy.findByRole("heading", { name: "BUF -2.0" }).should("be.visible");
  });

  it("can make a pick", () => {
    cy.intercept("/trpc/makePick*", { body: { result: { data: {} } } });

    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pool />
      </MockProviders>,
    );
    cy.findByRole("button", { name: /Bills/ }).click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByText(/Are you sure you want to pick the Bills?/).should(
      "be.visible",
    );
    cy.findByRole("switch", {
      name: "Make pick secret",
      checked: false,
    }).should("be.visible");
    cy.intercept("/trpc/pool*", { body: responseWithPick });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByRole("heading", {
      name: "You're riding with the Bills this week!",
    }).should("be.visible");
  });

  it("sets secret toggle state for secret pick", () => {
    cy.intercept("/trpc/pool*", { body: responseWithSecretPick });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pool />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /Bills/ }).click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByRole("switch", { name: "Make pick secret", checked: true }).should(
      "be.visible",
    );
  });

  it("shows no picks during preseason", () => {
    cy.intercept("/trpc/pool*", { body: basicGamesAndPicksPreseasonResponse });

    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pool />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Test Pool 2023" }).should("be.visible");
    cy.findByRole("heading", {
      name: "Hang tight! The season hasn't started yet...",
    }).should("be.visible");
  });
});
