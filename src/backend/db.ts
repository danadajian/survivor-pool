import postgres from "postgres";
import { environmentVariables } from "./env";
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

export async function fetchForbiddenTeamsForUser({
  username,
  week,
  season,
}: {
  username: string;
  week: number;
  season: number;
}) {
  const result = await db.query.picks.findMany({
    columns: { teamPicked: true },
    where: sql`username = ${username} and week < ${week} and season = ${season}`,
  });
  return result.length ? result.map(({ teamPicked }) => teamPicked) : undefined;
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
    .values({ username, teamPicked, week, season, poolId: 1 });
}
