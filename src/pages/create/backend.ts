import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { userFields } from "../../components/page-wrapper";
import { db } from "../../db";
import { pools } from "../../schema";
import { fetchCurrentGames } from "../../utils/fetch-current-games";
import { joinPool } from "../join/backend";

export const createPoolInput = v.object({
  ...userFields,
  poolName: v.pipe(v.string(), v.nonEmpty("Please enter a pool name.")),
  lives: v.optional(v.number()),
});

export async function createPool({
  poolName,
  lives,
  username,
  firstName,
  lastName,
}: v.InferInput<typeof createPoolInput>) {
  const existingPool = await db.query.pools.findFirst({
    where: eq(pools.name, poolName),
  });

  if (existingPool) {
    throw new TRPCError({
      message: "A pool with that name already exists.",
      code: "CONFLICT",
    });
  }

  const {
    week: { number: currentWeek },
    season: { year: currentSeason },
  } = await fetchCurrentGames();
  const [insertResult] = await db
    .insert(pools)
    .values({
      name: poolName,
      lives,
      creator: username,
      weekStarted: currentWeek,
      poolStart: "",
      poolEnd: "",
      season: currentSeason,
    })
    .returning({ id: pools.id });
  const poolId = insertResult?.id;
  if (!poolId) {
    throw new TRPCError({
      message: "Pool was not created.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
  return joinPool({ username, firstName, lastName, poolId });
}
