import React from "react";

import { Picks } from "../../src/pages/picks/frontend";
import { picksForPoolResponse } from "../../test/mocks";
import { MockProviders } from "../support/mock-providers";

describe("picks page", () => {
  it("renders all picks for the week", () => {
    cy.intercept("/trpc/*", { body: picksForPoolResponse });

    cy.mount(
      <MockProviders initialEntries={["/picks/123"]}>
        <Picks />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Week 1 Picks" }).should("be.visible");
    cy.findByRole("table").should("be.visible");
    cy.findByText("Test User1").should("be.visible");
    cy.findByText("Test User2").should("be.visible");
  });
});
