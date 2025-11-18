import { parseRoute } from "./parse-route";

export function handleBotRequest(requestUrl: URL, headers: Headers): Response {
  // Handle reverse proxy scenarios (e.g., Railway, Cloudflare)
  // Check for forwarded protocol header
  const forwardedProto = headers.get("x-forwarded-proto");
  const forwardedHost = headers.get("x-forwarded-host");

  let baseUrl: string;
  if (forwardedProto && forwardedHost) {
    // Use forwarded headers if available (common in production behind proxy)
    baseUrl = `${forwardedProto}://${forwardedHost}`;
  } else {
    // Fall back to request URL origin
    baseUrl = requestUrl.origin;
  }

  const ogUrl = requestUrl.toString();
  const { endpoint } = parseRoute(requestUrl.pathname);
  const ogTitle =
    endpoint === "join" ? "Join My Survivor Pool" : "Survivor Pool";
  const ogImage = `${baseUrl}/public/og.png`;

  const shareHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${ogTitle}</title>
    <meta property="og:title" content="${ogTitle}" />
    <meta
      property="og:description"
      content="Create, manage, and win your NFL survivor pool with friends."
    />
    <meta
      property="og:image"
      content="${ogImage}"
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ogUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta
      name="twitter:description"
      content="Create, manage, and win your NFL survivor pool with friends."
    />
    <meta
      name="twitter:image"
      content="${ogImage}"
    />
  </head>
  <body>
    <main>
      <h1>Survivor Pool</h1>
      <p>Share this link to show a preview card on social media.</p>
    </main>
  </body>
</html>`;

  return new Response(shareHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
