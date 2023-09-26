import type { Config } from "drizzle-kit";

import { environmentVariables } from "./src/env";

export default {
  schema: "./src/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: environmentVariables.POSTGRES_URL,
  },
} satisfies Config;
