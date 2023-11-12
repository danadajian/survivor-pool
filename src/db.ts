import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { environmentVariables } from "./env";
import * as schema from "./schema";

export const pgClient = postgres(environmentVariables.POSTGRES_URL, {
  max_lifetime: 3600,
});
export const db = drizzle(pgClient, { schema });
