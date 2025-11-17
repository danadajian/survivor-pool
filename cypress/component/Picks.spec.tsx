import React from "react";

import { Picks } from "../../src/pages/picks/frontend";
import {
  basicGamesAndPicksResponse,
  picksForWeekResponse,
  poolMemberLivesRemainingResponse,
} from "../../test/mocks";
import { MockProviders } from "../support/mock-providers";

describe("picks page", () => {
  it("renders all picks for the week", () => {
    cy.intercept("/trpc/*", (req) => {
      const url = new URL(req.url);
      const path = url.pathname.replace("/trpc", "").replace(/^\//, "");
      const procedures = path
        .split(",")
        .map((procedure) => procedure.trim())
        .filter(Boolean);

      if (!procedures.length) {
        throw new Error(`Unable to determine TRPC procedure for ${req.url}`);
      }
      const responses = procedures.map((procedure) => {
        if (procedure.startsWith("poolMemberLivesRemaining")) {
          return poolMemberLivesRemainingResponse;
        }
        if (procedure.startsWith("picksForWeek")) {
          return picksForWeekResponse;
        }
        if (procedure.startsWith("pool")) {
          return basicGamesAndPicksResponse;
        }

        throw new Error(`No mock defined for procedure: ${procedure}`);
      });

      req.reply({
        body: responses.length === 1 ? responses[0] : responses,
      });
    });

    cy.mount(
      <MockProviders initialEntries={["/picks/123"]}>
        <Picks />
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
