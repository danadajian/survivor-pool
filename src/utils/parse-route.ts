export function parseRoute(pathname: string) {
  const endpoint = pathname.split("/")[1];

  // Extract poolId from routes like /pool/:poolId or /picks/:poolId
  // Same pattern as useMatch(`/${endpoint}/:poolId`)
  const poolId = endpoint
    ? pathname.split(`/${endpoint}/`)[1]?.split("/")[0]
    : undefined;

  return { endpoint, poolId };
}
