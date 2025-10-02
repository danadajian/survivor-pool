import * as v from "valibot";

export const userFields = {
    username: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
} as const;
