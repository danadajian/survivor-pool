import { ClerkClient } from "@clerk/backend";
import { buildAccountsBaseUrl } from "@clerk/shared/buildAccountsBaseUrl";
import { parsePublishableKey } from "@clerk/shared/keys";

import { CLERK_PUBLISHABLE_KEY } from "../constants";

export function redirectToSignIn(
  authResult: Awaited<ReturnType<ClerkClient["authenticateRequest"]>>,
  requestUrl: URL,
) {
  const signInUrl = resolveSignInUrl(authResult.signInUrl, requestUrl);
  const headers = new Headers(authResult.headers);
  headers.set("location", signInUrl.toString());

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
  return `${accountsBaseUrl}/sign-in`;
}
