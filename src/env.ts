import * as v from "valibot";

export const envSchema = v.object({
  PORT: v.optional(v.string()),
  ENVIRONMENT: v.optional(
    v.union([v.literal("development"), v.literal("production")]),
  ),
  GAMES_API_URL: v.optional(v.string()),
  POSTGRES_URL: v.string(),
});
const result = v.safeParse(envSchema, process.env);
if (!result.success) {
  throw new Error("Environment variable schema invalid.");
}
export const environmentVariables = result.output;
export const isDev = environmentVariables.ENVIRONMENT === "development";
