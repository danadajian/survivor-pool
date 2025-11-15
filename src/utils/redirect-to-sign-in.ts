import { ClerkClient } from "@clerk/backend";
import { buildAccountsBaseUrl } from "@clerk/shared/buildAccountsBaseUrl";
import { parsePublishableKey } from "@clerk/shared/keys";

import { CLERK_PUBLISHABLE_KEY } from "../constants";

export function redirectToSignIn(
  authResult: Awaited<ReturnType<ClerkClient["authenticateRequest"]>>,
  requestUrl: URL,
) {
  if (authResult.status === "handshake") {
    return new Response(null, {
      status: 307,
      headers: authResult.headers,
    });
  }

  const signInUrl = resolveSignInUrl(authResult.signInUrl, requestUrl);

  if (!signInUrl.searchParams.has("redirect_url")) {
    signInUrl.searchParams.set("redirect_url", requestUrl.toString());
  }

  const headers = new Headers(authResult.headers);
  headers.set("Location", signInUrl.toString());

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
