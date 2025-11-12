/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app";

// On the client, always use ClerkProvider (no userData prop)
// The server has already rendered the correct HTML based on auth state,
// and ClerkProvider will hydrate and take over for client-side interactions
hydrateRoot(
  document,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
