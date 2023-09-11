import { App } from "../../src/frontend/app";
import { mockEspnResponse } from "../../src/backend/mock-espn-response";

describe("App.cy.tsx", () => {
  beforeEach(() => {
    cy.intercept("/trpc/games*", {
      body: { result: { data: mockEspnResponse } },
    }).as("games");
  });

  it("renders", () => {
    cy.mount(<App />);

    cy.findByText("Week 1").should("be.visible");
  });
});
