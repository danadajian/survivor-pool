import React from "react";

import { Edit } from "../../src/pages/edit/frontend";
import { MockProviders } from "../support/mock-providers";

describe("edit page", () => {
  it("should edit a pool", () => {
    cy.intercept("/trpc/getPool*", {
      body: {
        result: { data: { poolId: 123, name: "Test Pool" } },
      },
    });
    cy.intercept("/trpc/editPool*", { body: { result: { data: {} } } });

    cy.mount(
      <MockProviders>
        <Edit />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Edit Pool" }).should("be.visible");
    cy.findByLabelText("Pool Name").type("Test Pool");
    cy.findByRole("button", { name: "Update" }).click();
    cy.findByRole("heading", {
      name: "Test Pool updated successfully!",
    }).should("be.visible");
  });
});
