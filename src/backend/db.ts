import postgres from "postgres";
import { environmentVariables } from "./env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const pgClient = postgres(environmentVariables.POSTGRES_URL);
export const db = drizzle(pgClient, { schema });
