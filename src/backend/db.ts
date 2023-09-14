import postgres from "postgres";
import { environmentVariables } from "./env";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql, desc, eq } from "drizzle-orm";
import * as schema from "./schema";
import { picks, poolMembers, pools } from "./schema";
import { TRPCError } from "@trpc/server";

export const pgClient = postgres(environmentVariables.POSTGRES_URL);
export const db = drizzle(pgClient, { schema });

export async function fetchPickForUser({
  username,
  week,
  season,
}: Pick<typeof picks.$inferSelect, "username" | "week" | "season">) {
  return db.query.picks.findFirst({
    where: sql`username = ${username} and week = ${week} and season = ${season}`,
  });
}

export async function fetchForbiddenTeamsForUser({
  username,
  week,
  season,
}: Pick<typeof picks.$inferSelect, "username" | "week" | "season">) {
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
  poolId,
}: Pick<
  typeof picks.$inferSelect,
  "username" | "teamPicked" | "week" | "season" | "poolId"
>) {
  const existingPick = await fetchPickForUser({ username, week, season });
  if (existingPick) {
    return db
      .update(picks)
      .set({ teamPicked })
      .where(eq(picks.id, existingPick.id));
  }
  return db
    .insert(picks)
    .values({ username, teamPicked, week, season, poolId });
}

export async function createPool({ name, creator }: typeof pools.$inferInsert) {
  const existingPool = await db.query.poolMembers.findFirst({
    where: sql`name = ${name}`,
  });

  if (existingPool) {
    return new TRPCError({
      message: "A pool with that name already exists.",
      code: "CONFLICT",
    });
  }
  return db.insert(pools).values({ name, creator });
}

export async function joinPool({
  username,
  poolId,
}: typeof poolMembers.$inferInsert) {
  const existingPoolMember = await db.query.poolMembers.findFirst({
    where: sql`username = ${username} and pool_id = ${poolId}`,
  });

  if (existingPoolMember) {
    return new TRPCError({
      message: "You have already joined this pool.",
      code: "CONFLICT",
    });
  }
  return db.insert(poolMembers).values({ username, poolId });
}

export async function fetchPoolsForUser({
  username,
  poolId,
}: typeof poolMembers.$inferSelect) {
  return db
    .select({ poolId: pools.id, poolName: pools.name })
    .from(poolMembers)
    .where(sql`username = ${username} and pool_id = ${poolId}`)
    .innerJoin(pools, eq(poolMembers.poolId, pools.id));
}

export async function fetchPicksForPool({
  week,
  season,
  poolId,
}: Pick<typeof picks.$inferSelect, "week" | "season" | "poolId">) {
  return db
    .select()
    .from(picks)
    .where(sql`week = ${week} and season = ${season} and pool_id = ${poolId}`)
    .orderBy(desc(picks.season), desc(picks.week));
}
