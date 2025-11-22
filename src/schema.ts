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

export const SPORTS = ["NFL", "NBA", "NHL"] as const;
export type Sport = (typeof SPORTS)[number];

export const sportEnum = pgEnum("sport", SPORTS);

export const picks = pgTable("picks", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 256 }).notNull(),
  teamPicked: varchar("team_picked", { length: 256 }).notNull(),
  pickDate: varchar("pick_date", { length: 256 }).notNull(),
  season: integer().notNull(),
  poolId: uuid("pool_id").notNull(),
  timestamp: timestamp().notNull().defaultNow(),
  pickIsSecret: boolean().default(false),
  result: resultEnum().notNull().default("PENDING"),
});

export const pools = pgTable("pools", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  creator: varchar({ length: 256 }).notNull(),
  sport: sportEnum().notNull().default("NFL"),
  lives: integer().notNull().default(1),
  poolStart: varchar("pool_start", { length: 256 }).notNull().default(""),
  poolEnd: varchar("pool_end", { length: 256 }),
  season: integer().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  poolWinner: varchar("pool_winner", { length: 256 }),
});

export const members = pgTable("members", {
  id: uuid().primaryKey().defaultRandom(),
  poolId: uuid("pool_id").notNull(),
  username: varchar({ length: 256 }).notNull(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
});
