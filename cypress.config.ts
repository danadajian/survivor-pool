import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        resolve: {
          tsconfigPaths: true,
        },
      },
    },
    specPattern: "test/cypress/**/*.cy.tsx",
    supportFile: "test/cypress/support/component.ts",
    indexHtmlFile: "test/cypress/support/component-index.html",
  },
  screenshotOnRunFailure: false,
  video: false,
});
