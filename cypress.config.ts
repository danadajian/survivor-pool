import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {},
    },
    specPattern: "test/cypress/**/*.tsx",
    supportFile: "test/cypress/support/component.ts",
    indexHtmlFile: "test/cypress/support/component-index.html",
  },
  screenshotOnRunFailure: false,
  video: false,
});
