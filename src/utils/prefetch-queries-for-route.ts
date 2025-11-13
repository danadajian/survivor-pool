import { QueryClient } from "@tanstack/react-query";
import { Context } from "elysia";
import { UserData } from "src/components/user-context";
import { createContext } from "src/context";
import { appRouter } from "src/router";

import { parseRoute } from "./parse-route";

export async function prefetchQueriesForRoute(
  context: Context,
  userData: UserData,
  queryClient: QueryClient,
) {
  const pathname = new URL(context.request.url).pathname;
  const { endpoint, poolId } = parseRoute(pathname);
  const trpcContext = await createContext({ req: context.request });
  const caller = appRouter.createCaller(trpcContext);

  // Home page
  if (!endpoint) {
    await queryClient.prefetchQuery({
      queryKey: [
        ["poolsForUser"],
        { input: { username: userData.username }, type: "query" },
      ],
      queryFn: () => caller.poolsForUser({ username: userData.username }),
    });
    return;
  }

  if (endpoint === "winners") {
    await queryClient.prefetchQuery({
      queryKey: [
        ["winners"],
        { input: { username: userData.username }, type: "query" },
      ],
      queryFn: () => caller.winners({ username: userData.username }),
    });
    return;
  }

  if (!poolId) return;

  if (endpoint === "pool") {
    await queryClient.prefetchQuery({
      queryKey: [
        ["pool"],
        { input: { username: userData.username, poolId }, type: "query" },
      ],
      queryFn: () => caller.pool({ username: userData.username, poolId }),
    });
  } else if (endpoint === "picks") {
    await queryClient.prefetchQuery({
      queryKey: [["picksForPool"], { input: { poolId }, type: "query" }],
      queryFn: () => caller.picksForPool({ poolId }),
    });
  }
}
