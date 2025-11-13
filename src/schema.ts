import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const resultEnum = pgEnum("result", ["WON", "LOST", "PENDING"]);

export const picks = pgTable("picks", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 256 }).notNull(),
  teamPicked: varchar("team_picked", { length: 256 }).notNull(),
  week: integer("week").notNull(),
  season: integer("season").notNull(),
  poolId: uuid("pool_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  pickIsSecret: boolean().default(false),
  result: resultEnum("result").notNull().default("PENDING"),
});

export const pools = pgTable("pools", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  creator: varchar("creator", { length: 256 }).notNull(),
  lives: integer("lives").notNull().default(1),
  weekStarted: integer("week_started").notNull().default(1),
  weekEnded: integer("week_ended"),
  season: integer("season").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  poolWinner: varchar("pool_winner", { length: 256 }),
});

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  poolId: uuid("pool_id").notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
});
