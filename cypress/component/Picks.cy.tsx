import React from "react";
import spacetime from "spacetime";

import {
  basicGamesAndPicksResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
  responseWithPickAndResults,
} from "../../src/backend/mocks";
import { Pick } from "../../src/frontend/pages/pick";
import { MockProviders } from "../support/mock-clerk-provider";

describe("Picks.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/pick*", {
      body: basicGamesAndPicksResponse,
    });
  });

  it("renders without picks", () => {
    cy.stub(spacetime, "now").returns({
      toNativeDate: () =>
        new Date("Mon Sep 6 2023 21:50:04 GMT-0500 (Central Daylight Time)"),
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("heading", { name: "Test Pool 2023" }).should("be.visible");
    cy.findByRole("heading", { name: "Week 1" }).should("be.visible");
    cy.findByRole("heading", { name: "Make your pick, Test!" }).should(
      "be.visible",
    );
  });

  it("can make a pick", () => {
    cy.intercept("/trpc/makePick*", { body: { result: { data: {} } } }).as(
      "makePick",
    );
    cy.stub(spacetime, "now").returns({
      toNativeDate: () =>
        new Date("Mon Sep 6 2023 21:50:04 GMT-0500 (Central Daylight Time)"),
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /49ers/ }).should("be.visible").click();
    cy.findByRole("heading", { name: "Confirm pick" }).should("be.visible");
    cy.findByText(/Are you sure you want to pick the 49ers?/).should(
      "be.visible",
    );
    cy.intercept("/trpc/pick*", {
      body: responseWithPick,
    });
    cy.findByRole("button", { name: "Lock it in" }).click();
    cy.findByRole("button", { name: /49ers/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the 49ers this week!",
    }).should("be.visible");
  });

  it("prevents picking the same team twice", () => {
    cy.intercept("/trpc/pick*", {
      body: responseWithPickAndForbiddenTeams,
    });
    cy.stub(spacetime, "now").returns({
      toNativeDate: () =>
        new Date("Mon Sep 6 2023 21:50:04 GMT-0500 (Central Daylight Time)"),
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /49ers/ }).should("be.disabled");
    cy.findByRole("button", { name: /Bills/ }).should("be.disabled");
    cy.findByRole("button", { name: /Jets/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "You're riding with the 49ers this week!",
    }).should("be.visible");
  });

  it("prevents changing pick after picking a game that has started", () => {
    cy.intercept("/trpc/pick*", {
      body: responseWithPick,
    });
    cy.stub(spacetime, "now").returns({
      toNativeDate: () =>
        new Date("Mon Sep 10 2023 17:50:04 GMT-0500 (Central Daylight Time)"),
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /49ers/ }).should("be.disabled");
    cy.findByRole("heading", {
      name: "Your 49ers pick is locked. Good luck!",
    }).should("be.visible");
  });

  it("prevents picking a game that has started", () => {
    cy.intercept("/trpc/pick*", {
      body: basicGamesAndPicksResponse,
    });
    cy.stub(spacetime, "now").returns({
      toNativeDate: () =>
        new Date("Mon Sep 10 2023 17:50:04 GMT-0500 (Central Daylight Time)"),
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("button", { name: /49ers/ }).should("be.disabled");
    cy.findByRole("button", { name: /Bills/ }).should("be.enabled");
    cy.findByRole("heading", {
      name: "Make your pick, Test!",
    }).should("be.visible");
  });

  it("indicates when you survived a week", () => {
    cy.intercept("/trpc/pick*", {
      body: responseWithPickAndResults,
    });
    cy.stub(spacetime, "now").returns({
      toNativeDate: () =>
        new Date("Mon Sep 12 2023 22:50:04 GMT-0500 (Central Daylight Time)"),
    });
    cy.mount(
      <MockProviders initialEntries={["/pick/123"]}>
        <Pick />
      </MockProviders>,
    );

    cy.findByRole("heading", {
      name: "The 49ers won, and you're still alive!",
    }).should("be.visible");
  });
});
