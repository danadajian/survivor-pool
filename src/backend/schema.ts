import {
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const picks = pgTable("picks", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 256 }).notNull(),
  teamPicked: varchar("team_picked", { length: 256 }).notNull(),
  week: integer("week").notNull(),
  season: integer("season").notNull(),
  poolId: integer("pool_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const pools = pgTable("pools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  creator: varchar("creator", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const poolMembers = pgTable("poolMembers", {
  id: uuid("id").primaryKey().defaultRandom(),
  poolId: integer("pool_id").notNull(),
  username: varchar("username", { length: 256 }).notNull(),
});
