import React from "react";

import { Join } from "../../src/pages/join/frontend";
import { MockProviders } from "../support/mock-providers";

describe("join page", () => {
  it("should join a pool", () => {
    cy.intercept("/trpc/*", {
      body: {
        result: { data: { id: "123", name: "Test Pool" } },
      },
    });
    cy.intercept("/trpc/joinPool*", { body: { result: { data: {} } } });

    cy.mount(
      <MockProviders initialEntries={["/join/123"]}>
        <Join />
      </MockProviders>,
    );
    cy.findByRole("heading", { name: "Join New Survivor Pool" }).should(
      "be.visible",
    );
    cy.findByRole("button", { name: "Join" }).click();
    cy.findByRole("heading", { name: "You have joined Test Pool!" }).should(
      "be.visible",
    );
  });
});
