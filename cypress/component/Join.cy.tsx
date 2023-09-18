import React from "react";

import { Join } from "../../src/frontend/pages/join";
import { MockProviders } from "../support/mock-clerk-provider";

describe("Join.cy.tsx", () => {
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
