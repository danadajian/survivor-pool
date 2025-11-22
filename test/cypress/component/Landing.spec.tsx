import React from "react";

import { Landing } from "../../../src/pages/home/landing";
import { MockProviders } from "../support/mock-providers";

describe("landing page", () => {
  it("should display landing page content for unauthenticated users", () => {
    cy.mount(
      <MockProviders initialEntries={["/"]} authenticated={false}>
        <Landing />
      </MockProviders>,
    );

    cy.findByRole("heading", { name: "Survivor Pool", level: 1 }).should(
      "be.visible",
    );
    cy.findByRole("button", { name: "Get Started" }).should("be.visible");
    cy.findByRole("button", { name: "Learn the Rules" }).should("be.visible");
  });
});
