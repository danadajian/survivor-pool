import React from "react";
import { Pools } from "../../src/frontend/pools";
import { picksForPoolResponse } from "../../src/backend/mocks";
import { MockClerkProvider } from "../support/mock-clerk-provider";

describe("Pools.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/picksForPool*", {
      body: picksForPoolResponse,
    });
  });

  it("renders", () => {
    cy.mount(
      <MockClerkProvider>
        <Pools />
      </MockClerkProvider>,
    );
  });
});
