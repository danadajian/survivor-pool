import React from "react";

import { Edit } from "../../src/pages/edit/frontend";
import { MockProviders } from "../support/mock-providers";

describe("edit page", () => {
  it("should edit a pool", () => {
    cy.intercept("/trpc/getPool*", {
      body: {
        result: {
          data: { id: "123", name: "Test Pool", lives: 1 },
        },
      },
    });
    cy.intercept("/trpc/editPool*", { body: { result: { data: {} } } });

    cy.mount(
      <MockProviders>
        <Edit />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Edit Pool" }).should("be.visible");
    cy.findByLabelText(/Pool name/i)
      .clear()
      .type("Test Pool Updated");
    cy.findByRole("button", { name: "Update Pool" }).click();
    cy.findByRole("heading", {
      name: "Test Pool Updated updated successfully!",
    }).should("be.visible");
  });
});
