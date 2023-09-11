import {App} from "../../frontend/app";

describe('App.cy.tsx', () => {
  it('renders', () => {
    cy.mount(<App />)
  })
});
