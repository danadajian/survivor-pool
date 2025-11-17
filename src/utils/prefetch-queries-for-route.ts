import { QueryClient } from "@tanstack/react-query";
import { Context } from "elysia";
import { UserData } from "src/components/user-context";
import { createContext } from "src/context";
import { appRouter } from "src/router";

import { parseRoute } from "./parse-route";

export async function prefetchQueriesForRoute(
  context: Context,
  { username }: UserData,
  queryClient: QueryClient,
) {
  const pathname = new URL(context.request.url).pathname;
  const { endpoint, poolId } = parseRoute(pathname);
  const trpcContext = await createContext({ req: context.request });
  const caller = appRouter.createCaller(trpcContext);

  switch (endpoint) {
    case "":
      await queryClient.prefetchQuery({
        queryKey: [["poolsForUser"], { input: { username }, type: "query" }],
        queryFn: () => caller.poolsForUser({ username }),
      });
    case "winners":
      await queryClient.prefetchQuery({
        queryKey: [["winners"], { input: { username }, type: "query" }],
        queryFn: () => caller.winners({ username }),
      });
    case "pool":
      if (!poolId) return;
      await queryClient.prefetchQuery({
        queryKey: [["pool"], { input: { username, poolId }, type: "query" }],
        queryFn: () => caller.pool({ username, poolId }),
      });
    case "picks":
      if (!poolId) return;
      const poolMemberData = await caller.poolMemberLivesRemaining({ poolId });
      await queryClient.prefetchQuery({
        queryKey: [
          ["poolMemberLivesRemaining"],
          { input: { poolId }, type: "query" },
        ],
        queryFn: () => Promise.resolve(poolMemberData),
      });

      // Parse URL params for week/season if present
      const url = new URL(context.request.url);
      const weekParam = url.searchParams.get("week");
      const seasonParam = url.searchParams.get("season");
      const week = weekParam ? Number(weekParam) : poolMemberData.week;
      const season = seasonParam ? Number(seasonParam) : poolMemberData.season;

      await queryClient.prefetchQuery({
        queryKey: [
          ["picksForWeek"],
          { input: { poolId, week, season }, type: "query" },
        ],
        queryFn: () => caller.picksForWeek({ poolId, week, season }),
      });
  }
}
