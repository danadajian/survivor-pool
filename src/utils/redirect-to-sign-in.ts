import { ClerkClient } from "@clerk/backend";
import { buildAccountsBaseUrl } from "@clerk/shared/buildAccountsBaseUrl";
import { parsePublishableKey } from "@clerk/shared/keys";

import { CLERK_PUBLISHABLE_KEY } from "../constants";
import { logger } from "./logger";

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

const getSignInUrlFromPublishableKey = () => {
  try {
    const parsed = parsePublishableKey(CLERK_PUBLISHABLE_KEY);
    if (!parsed?.frontendApi) {
      return null;
    }
    const accountsBaseUrl = buildAccountsBaseUrl(parsed.frontendApi);
    if (!accountsBaseUrl) {
      return null;
    }
    return `${accountsBaseUrl}/sign-in`;
  } catch (error) {
    logger.error(
      { error },
      "Failed to derive fallback sign-in URL from publishable key.",
    );
    return null;
  }
};

const resolveSignInUrl = (signInUrl: string, requestUrl: URL) => {
  const fallback =
    getSignInUrlFromPublishableKey() ?? `${requestUrl.origin}/sign-in`;
  const target = signInUrl.trim() ?? fallback;

  return target.startsWith("http")
    ? new URL(target)
    : new URL(target, requestUrl.origin);
};
