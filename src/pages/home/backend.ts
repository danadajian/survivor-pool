import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { members, pools } from "../../schema";

export const fetchPoolsForUserInput = type({
  username: "string",
});

export async function fetchPoolsForUser({
  username,
}: typeof fetchPoolsForUserInput.infer) {
  return db
    .select({ poolId: pools.id, poolName: pools.name })
    .from(members)
    .where(eq(members.username, username))
    .innerJoin(pools, eq(members.poolId, pools.id));
}
