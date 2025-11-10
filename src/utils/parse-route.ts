/**
 * Server-side utility to parse route information from a pathname.
 * Mirrors the logic used in useEndpoint() and page-wrapper.tsx
 */
export function parseRoute(pathname: string) {
  // Extract endpoint (first segment) - same logic as useEndpoint()
  const endpoint = pathname.split("/")[1] || null;

  // Extract poolId from routes like /pool/:poolId or /picks/:poolId
  // Same pattern as useMatch(`/${endpoint}/:poolId`) in page-wrapper.tsx
  const poolId = endpoint
    ? pathname.split(`/${endpoint}/`)[1]?.split("/")[0]
    : null;

  return { endpoint, poolId };
}
