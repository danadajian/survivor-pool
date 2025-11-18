import { ClerkClient } from "@clerk/backend";
import { buildAccountsBaseUrl } from "@clerk/shared/buildAccountsBaseUrl";
import { parsePublishableKey } from "@clerk/shared/keys";

import { CLERK_PUBLISHABLE_KEY } from "../constants";
import { logger } from "./logger";

export function redirectToSignIn(
  authResult: Awaited<ReturnType<ClerkClient["authenticateRequest"]>>,
  requestUrl: URL,
) {
  const signInUrl = resolveSignInUrl(authResult.signInUrl, requestUrl);

  signInUrl.searchParams.set("redirect_url", requestUrl.toString());

  // Preserve all Clerk headers (important for Safari cookie handling)
  const headers = new Headers(authResult.headers);
  if (!headers.has("location")) {
    headers.set("location", signInUrl.toString());
  }
  logger.info({ signInUrl });
  logger.info({ headers });

  return new Response(null, {
    status: 307,
    headers,
  });
}

function resolveSignInUrl(signInUrl: string, requestUrl: URL) {
  const accountsBaseUrl = getSignInUrlFromPublishableKey();
  const target = signInUrl.trim() || accountsBaseUrl;

  return target.startsWith("http")
    ? new URL(target)
    : new URL(target, requestUrl.origin);
}

function getSignInUrlFromPublishableKey() {
  const parsed = parsePublishableKey(CLERK_PUBLISHABLE_KEY);

  const accountsBaseUrl = buildAccountsBaseUrl(parsed?.frontendApi);
  if (!accountsBaseUrl) {
    throw new Error(
      "Failed to derive fallback sign-in URL from publishable key.",
    );
  }
  return `${accountsBaseUrl}/sign-in`;
}
