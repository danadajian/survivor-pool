import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { members, pools } from "../../schema";

export const fetchPoolsForUserInput = type({
  username: "string>0",
});

export async function fetchPoolsForUser({
  username,
}: typeof fetchPoolsForUserInput.infer) {
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
