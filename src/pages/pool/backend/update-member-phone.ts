import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "../../../db";
import { members } from "../../../schema";

const phoneNumberRegex = /^\+[1-9]\d{1,14}$/;

export const updateMemberPhoneInput = v.object({
  username: v.string(),
  poolId: v.pipe(v.string(), v.uuid()),
  phoneNumber: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        phoneNumberRegex,
        "Phone number must be in E.164 format (e.g., +1234567890). Include country code.",
      ),
    ),
  ),
});

export async function updateMemberPhone({
  username,
  poolId,
  phoneNumber,
}: v.InferInput<typeof updateMemberPhoneInput>) {
  const member = await db.query.members.findFirst({
    where: and(eq(members.username, username), eq(members.poolId, poolId)),
  });

  if (!member) {
    throw new TRPCError({
      message: "User is not a member of this pool.",
      code: "NOT_FOUND",
    });
  }

  // Update phone number (can be null to opt out)
  await db
    .update(members)
    .set({ phoneNumber: phoneNumber || null })
    .where(and(eq(members.username, username), eq(members.poolId, poolId)));

  return { success: true };
}
