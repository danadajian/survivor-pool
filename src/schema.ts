import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const resultEnum = pgEnum("result", ["WON", "LOST"]);

export const picks = pgTable("picks", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 256 }).notNull(),
  teamPicked: varchar("team_picked", { length: 256 }).notNull(),
  teamWon: boolean("team_won"),
  week: integer("week").notNull(),
  season: integer("season").notNull(),
  poolId: uuid("pool_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  result: resultEnum("result"),
});

export const pools = pgTable("pools", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  creator: varchar("creator", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  poolId: uuid("pool_id").notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  eliminated: boolean("eliminated").notNull().default(false),
});
