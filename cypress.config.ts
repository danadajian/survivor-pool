import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {},
    },
    specPattern: "cypress/**/*.spec.tsx",
  },
  screenshotOnRunFailure: false,
  video: false,
});
