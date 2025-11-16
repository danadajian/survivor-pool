import { ClerkClient } from "@clerk/backend";
import { buildAccountsBaseUrl } from "@clerk/shared/buildAccountsBaseUrl";
import { parsePublishableKey } from "@clerk/shared/keys";

import { CLERK_PUBLISHABLE_KEY } from "../constants";

export function redirectToSignIn(
  authResult: Awaited<ReturnType<ClerkClient["authenticateRequest"]>>,
  requestUrl: URL,
) {
  if (authResult.status === "handshake") {
    // For handshake, Clerk handles the redirect, but we may need to ensure redirect_url
    // is set for Safari compatibility. Check if Location header has redirect_url.
    const location = authResult.headers.get("Location");
    if (location) {
      const locationUrl = new URL(location);
      // If redirect_url is missing or points to accounts.dev, override it
      const currentRedirectUrl = locationUrl.searchParams.get("redirect_url");
      if (!currentRedirectUrl || currentRedirectUrl.includes("accounts.dev")) {
        locationUrl.searchParams.set("redirect_url", requestUrl.toString());
        const headers = new Headers(authResult.headers);
        headers.set("Location", locationUrl.toString());
        return new Response(null, {
          status: 307,
          headers,
        });
      }
    }
    return new Response(null, {
      status: 307,
      headers: authResult.headers,
    });
  }

  const signInUrl = resolveSignInUrl(authResult.signInUrl, requestUrl);

  signInUrl.searchParams.set("redirect_url", requestUrl.toString());

  // Preserve all Clerk headers (important for Safari cookie handling)
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
