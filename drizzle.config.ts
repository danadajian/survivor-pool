import type { Config } from "drizzle-kit";
import { environmentVariables } from "./src/backend/env";

export default {
  schema: "./src/backend/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: environmentVariables.POSTGRES_URL,
  },
} satisfies Config;
