import React from "react";
import spacetime from "spacetime";

import { Create } from "../../src/pages/create/frontend";
import { Join } from "../../src/pages/join/frontend";
import { Pick } from "../../src/pages/pick/frontend";
import { Pools } from "../../src/pages/pools/frontend";
import {
  basicGamesAndPicksResponse,
  picksForPoolResponse,
  responseWithPick,
  responseWithPickAndForbiddenTeams,
  responseWithPickAndResultsTeamLost,
  responseWithPickAndResultsTeamWon,
} from "../../test/mocks";
import { MockProviders } from "../support/mock-clerk-provider";

describe("App Tests", () => {
  context("Create", () => {
    beforeEach(() => {
      cy.intercept("/trpc/createPool*", {
        body: { result: { data: { poolId: 123 } } },
      });
    });

    it("can create a pool", () => {
      cy.mount(
        <MockProviders>
          <Create />
        </MockProviders>,
      );

      cy.findByRole("heading", { name: "Create New Pool" }).should(
        "be.visible",
      );
      cy.findByLabelText("Pool Name").type("Test Pool");
      cy.findByRole("button", { name: "Create" }).click();
      cy.findByRole("heading", {
        name: "Test Pool created successfully!",
      }).should("be.visible");
    });
  });

  context("Join", () => {
    beforeEach(() => {
      cy.intercept("/trpc/joinPool*", {
        body: { result: { data: {} } },
      });
    });

    it("can join a pool", () => {
      cy.mount(
        <MockProviders initialEntries={["/join/123"]}>
          <Join />
        </MockProviders>,
      );

      cy.findByRole("heading", { name: "Join New Pool" }).should("be.visible");
      cy.findByRole("button", { name: "Join" }).click();
      cy.findByRole("heading", { name: "You have joined the pool!" }).should(
        "be.visible",
      );
    });
  });

  context("Picks", () => {
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
      cy.findByRole("heading", { name: "BUF -2.0" }).should("be.visible");
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
        body: responseWithPickAndResultsTeamWon,
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

    it("indicates when you have been eliminated", () => {
      cy.intercept("/trpc/pick*", {
        body: responseWithPickAndResultsTeamLost,
      });
      cy.mount(
        <MockProviders initialEntries={["/pick/123"]}>
          <Pick />
        </MockProviders>,
      );

      cy.findByRole("heading", {
        name: "Sorry, you have been eliminated from this pool.",
      }).should("be.visible");
    });
  });

  context("Pools", () => {
    beforeEach(() => {
      cy.intercept("/trpc/picksForPool*", {
        body: picksForPoolResponse,
      });
    });

    it("renders all picks for the week", () => {
      cy.mount(
        <MockProviders initialEntries={["/pools/123"]}>
          <Pools />
        </MockProviders>,
      );

      cy.findByRole("heading", { name: "Week 1 Picks" }).should("be.visible");
      cy.findByRole("table").should("be.visible");
      cy.findByText("Test User1").should("be.visible");
      cy.findByText("Test User2").should("be.visible");
    });
  });
});
