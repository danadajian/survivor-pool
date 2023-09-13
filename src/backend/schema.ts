import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const picks = pgTable("picks", {
  id: uuid("id").notNull().primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  teamPicked: varchar("team_picked", { length: 256 }).notNull(),
  week: integer("week").notNull(),
  season: integer("season").notNull(),
  timestamp: timestamp("timestamp")
    .notNull()
    .default(sql`current_timestamp`),
});
