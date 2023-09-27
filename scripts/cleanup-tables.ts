import { db } from "../src/db";
import { members, picks, pools } from "../src/schema";

await db.delete(picks);
await db.delete(pools);
await db.delete(members);

process.exit(0);
