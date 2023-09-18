import React from "react";

import { Create } from "../../src/frontend/pages/create";
import { MockProviders } from "../support/mock-clerk-provider";

describe("Pools.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/createPool*", {
      body: { result: { data: {} } },
    });
  });

  it("can create a pool", () => {
    cy.mount(
      <MockProviders>
        <Create />
      </MockProviders>,
    );

    cy.findByRole("heading", { name: "Create New Pool" }).should("be.visible");
    cy.findByLabelText("Pool Name").type("Test Pool");
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("heading", {
      name: "Test Pool created successfully!",
    }).should("be.visible");
  });
});
