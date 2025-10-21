/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/consistent-type-definitions */
import "./commands";

import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
