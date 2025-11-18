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

  const signInUrl = resolveSignInUrl(requestUrl);
  const headers = new Headers(authResult.headers);
  headers.set("location", signInUrl.toString());

  return new Response(null, {
    status: 307,
    headers,
  });
}

function resolveSignInUrl(requestUrl: URL) {
  const signInUrl = getSignInUrlFromPublishableKey(requestUrl);

  return signInUrl.startsWith("http")
    ? new URL(signInUrl)
    : new URL(signInUrl, requestUrl.origin);
}

function getSignInUrlFromPublishableKey(requestUrl: URL) {
  const parsed = parsePublishableKey(CLERK_PUBLISHABLE_KEY);

  const accountsBaseUrl = buildAccountsBaseUrl(parsed?.frontendApi);
  const redirectUrl = `${requestUrl.origin}${requestUrl.pathname}`;
  return `${accountsBaseUrl}/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`;
}
