import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, pools } from "../../schema";
import { poolInput } from "../join/backend";

export const fetchPoolsForUserInput = v.object({
  username: v.string(),
});

export async function fetchPoolsForUser({
  username,
}: v.InferInput<typeof fetchPoolsForUserInput>) {
  return db
    .select({
      poolId: pools.id,
      poolName: pools.name,
      creator: pools.creator,
      sport: pools.sport,
    })
    .from(members)
    .where(and(eq(members.username, username), isNull(pools.poolEnded)))
    .innerJoin(pools, eq(members.poolId, pools.id));
}

export async function deletePool({ poolId }: v.InferInput<typeof poolInput>) {
  return db.delete(pools).where(eq(pools.id, poolId));
}
