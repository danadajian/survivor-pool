import { parseRoute } from "./parse-route";

export function handleBotRequest(requestUrl: URL) {
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
  const ogUrl = requestUrl.toString();
  const { endpoint } = parseRoute(requestUrl.pathname);
  const ogTitle =
    endpoint === "join" ? "Join My Survivor Pool" : "Survivor Pool";

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
      content="${baseUrl}/public/og.png"
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
      content="${baseUrl}/public/og.png"
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
