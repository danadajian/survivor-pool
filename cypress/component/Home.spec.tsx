import React from "react";

import { Home } from "../../src/pages/home/frontend";
import { poolsForUserResponse } from "../../test/mocks";
import { MockProviders } from "../support/mock-providers";

describe("home page", () => {
  it("should display available pools", () => {
    cy.intercept("/trpc/poolsForUser*", { body: poolsForUserResponse });

    cy.mount(
      <MockProviders initialEntries={["/"]}>
        <Home />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Welcome to Survivor Pool!" }).should(
      "be.visible",
    );
    cy.findByText("Pool 1").should("be.visible");
    cy.findByText("Pool 2").should("be.visible");
    cy.findAllByRole("button", { name: "Go to Pool" }).should("have.length", 2);
  });
});
