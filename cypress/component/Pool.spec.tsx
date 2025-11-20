import React from "react";

import { Pool } from "../../src/pages/pool/frontend";
import {
  basicGamesAndPicksPreseasonResponse,
  basicGamesAndPicksResponse,
  picksForWeekResponse,
  poolMemberLivesRemainingResponse,
  responseWithPick,
  responseWithSecretPick,
} from "../../test/mocks";
import { MockProviders } from "../support/mock-providers";

describe("pool page", () => {
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
    cy.findByText("Make your pick, Test!").should("be.visible");
    cy.findByText("BUF -2.0").should("be.visible");
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
    cy.findByText(/Are you sure you want to pick the Bills\?/).should(
      "be.visible",
    );
    cy.findByRole("switch", {
      name: "Make pick secret",
      checked: false,
    }).should("be.visible");
    cy.intercept("/trpc/pool*", { body: responseWithPick });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByText("You're riding with the Bills this week!").should(
      "be.visible",
    );
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
    cy.findByText(
      "Hang tight! The season hasn't started yet. Once games are on the calendar, you'll see your weekly matchups here.",
    ).should("be.visible");
  });

  it("renders all picks for the week", () => {
    cy.intercept("/trpc/pool*", { body: basicGamesAndPicksResponse });
    cy.intercept("/trpc/picksForWeek,poolMemberLivesRemaining*", {
      body: [picksForWeekResponse, poolMemberLivesRemainingResponse],
    });

    cy.mount(
      <MockProviders initialEntries={["/pick/123?view=all-picks"]}>
        <Pool />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Weekly results" }).should("be.visible");
    cy.findByRole("heading", { name: "Pool members" }).should("be.visible");
    cy.findByText(/Team picked/i).should("be.visible");
    cy.findByText(/Lives remaining/i).should("be.visible");
    cy.findAllByText("Test User1").should("be.visible");
    cy.findAllByText("Test User2").should("be.visible");
  });
});
