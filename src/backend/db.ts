import postgres from "postgres";
import { environmentVariables } from "./env";
import type { makePickInput } from "./schema";
import { randomUUID } from "crypto";

export const sql = postgres(environmentVariables.POSTGRES_URL, {
  transform: postgres.camel,
});

export async function makePick({
  username,
  teamPicked,
  week,
  season,
}: typeof makePickInput.infer) {
  return sql`INSERT INTO picks ${sql([
    { id: randomUUID(), username, teamPicked, week, season },
  ])}`;
}
