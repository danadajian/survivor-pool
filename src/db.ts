import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { environmentVariables } from "./env";
import * as schema from "./schema";

export const pgClient = postgres(environmentVariables.POSTGRES_URL, {
  idle_timeout: 60,
});
export const db = drizzle(pgClient, { schema });
