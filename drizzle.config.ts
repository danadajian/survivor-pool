import { defineConfig } from "drizzle-kit";

import { environmentVariables } from "@/env";

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: environmentVariables.POSTGRES_URL,
  },
});
