import React from "react";

import { Create } from "../../../src/pages/create/frontend";
import { MockProviders } from "../support/mock-providers";

describe("create page", () => {
  it("should create a pool", () => {
    cy.intercept("/trpc/createPool*", {
      body: {
        result: { data: { poolId: 123 } },
      },
    });

    cy.mount(
      <MockProviders>
        <Create />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Create New Pool" }).should("be.visible");
    cy.findByLabelText(/Pool name/i).type("Test Pool");
    cy.findByRole("button", { name: "Create Pool" }).click();
    cy.findByRole("heading", {
      name: "Test Pool created successfully!",
    }).should("be.visible");
  });
});
