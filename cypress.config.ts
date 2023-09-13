import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  screenshotOnRunFailure: false,
  viewportWidth: 390,
  viewportHeight: 844,
});
