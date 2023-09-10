import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
