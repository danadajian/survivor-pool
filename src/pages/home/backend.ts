import { eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../db";
import { members, pools } from "../../schema";

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
      eliminated: members.eliminated,
    })
    .from(members)
    .where(eq(members.username, username))
    .innerJoin(pools, eq(members.poolId, pools.id));
}
