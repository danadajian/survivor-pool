import React from "react";

import { Picks } from "../../src/pages/picks/frontend";
import {
  picksForWeekResponse,
  poolMemberLivesRemainingResponse,
} from "../../test/mocks";
import { MockProviders } from "../support/mock-providers";

describe("picks page", () => {
  it("renders all picks for the week", () => {
    cy.intercept("/trpc/*", (req) => {
      if (req.url.includes("poolMemberLivesRemaining")) {
        req.reply({ body: poolMemberLivesRemainingResponse });
      } else if (req.url.includes("picksForWeek")) {
        req.reply({ body: picksForWeekResponse });
      }
    });

    cy.mount(
      <MockProviders initialEntries={["/picks/123"]}>
        <Picks />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Week 1 Picks" }).should("be.visible");
    cy.findByRole("heading", { name: "Pool members" }).should("be.visible");
    cy.findByText(/Team picked/i).should("be.visible");
    cy.findByText(/Lives remaining/i).should("be.visible");
    cy.findAllByText("Test User1").should("be.visible");
    cy.findAllByText("Test User2").should("be.visible");
  });
});
