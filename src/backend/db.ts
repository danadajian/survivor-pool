import postgres from "postgres";
import { environmentVariables } from "./env";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import { and, desc, eq } from "drizzle-orm";
import * as schema from "./schema";
import { picks } from "./schema";
import type { makePickInput } from "./router";

export const pgClient = postgres(environmentVariables.POSTGRES_URL);
export const db = drizzle(pgClient, { schema });

export async function makePick({
  username,
  teamPicked,
  week,
  season,
}: typeof makePickInput.infer) {
  return db
    .insert(picks)
    .values({ id: randomUUID(), username, teamPicked, week, season });
}

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
    where: and(
      and(and(eq(picks.username, username), eq(picks.week, week))),
      eq(picks.season, season),
    ),
    orderBy: desc(picks.timestamp),
  });
}
