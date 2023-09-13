import postgres from "postgres";
import { environmentVariables } from "./env";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql, desc, eq } from "drizzle-orm";
import * as schema from "./schema";
import { picks } from "./schema";
import type { makePickInput } from "./router";

export const pgClient = postgres(environmentVariables.POSTGRES_URL);
export const db = drizzle(pgClient, { schema });

export async function fetchPickForUser({
  username,
  week,
  season,
}: {
  username: string;
  week: number;
  season: number;
}) {
  return db.query.picks.findFirst({
    where: sql`username = ${username} and week = ${week} and season = ${season}`,
    orderBy: desc(picks.timestamp),
  });
}

export async function makePick({
  username,
  teamPicked,
  week,
  season,
}: typeof makePickInput.infer) {
  const existingPick = await fetchPickForUser({ username, week, season });
  if (existingPick) {
    return db
      .update(picks)
      .set({ teamPicked })
      .where(eq(picks.id, existingPick.id));
  }
  return db
    .insert(picks)
    .values({ id: randomUUID(), username, teamPicked, week, season });
}
