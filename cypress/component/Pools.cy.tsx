import React from "react";

import { Pools } from "../../src/pages/pools/frontend";
import { picksForPoolResponse } from "../../test/mocks";
import { MockProviders } from "../support/mock-clerk-provider";

describe("Pools.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/picksForPool*", {
      body: picksForPoolResponse,
    });
  });

  it("renders all picks for the week", () => {
    cy.mount(
      <MockProviders initialEntries={["/pools/123"]}>
        <Pools />
      </MockProviders>,
    );

    cy.findByRole("heading", { name: "Week 1 Picks" }).should("be.visible");
    cy.findByRole("table").should("be.visible");
    cy.findByText("test@user.com").should("be.visible");
  });
});
