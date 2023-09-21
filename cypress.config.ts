import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        define: {
          "process.env.DEBUG_PRINT_LIMIT": 10000,
        },
      },
    },
  },
  screenshotOnRunFailure: false,
  viewportWidth: 390,
  viewportHeight: 844,
});
