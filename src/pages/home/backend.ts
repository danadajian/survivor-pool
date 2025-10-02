import { eq } from "drizzle-orm";
import spacetime from "spacetime";
import * as v from "valibot";

import { db } from "../../db";
import { members, pools } from "../../schema";

export const fetchPoolsForUserInput = v.object({
  username: v.string(),
});

export async function fetchPoolsForUser({
  username,
}: v.InferInput<typeof fetchPoolsForUserInput>) {
    console.log('Fetching', spacetime.now().format("{day} {hour}:{minute-pad}:{second-pad}:{millisecond-pad} {ampm}"));
  return db
    .select({
      poolId: pools.id,
      poolName: pools.name,
      eliminated: members.eliminated,
      creator: pools.creator,
    })
    .from(members)
    .where(eq(members.username, username))
    .innerJoin(pools, eq(members.poolId, pools.id));
}
