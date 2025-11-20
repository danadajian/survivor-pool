import { QueryClient } from "@tanstack/react-query";
import { UserData } from "src/components/user-context";
import { createContext } from "src/context";
import { appRouter } from "src/router";

import { parseRoute } from "./parse-route";

export async function prefetchQueriesForRoute(
  request: Request,
  { username }: UserData,
  queryClient: QueryClient,
) {
  const url = new URL(request.url);
  const { endpoint, poolId } = parseRoute(url.pathname);
  const trpcContext = await createContext({ req: request });
  const caller = appRouter.createCaller(trpcContext);

  if (endpoint === "winners") {
    await queryClient.prefetchQuery({
      queryKey: [["winners"], { input: { username }, type: "query" }],
      queryFn: () => caller.winners({ username }),
    });
  }

  await queryClient.prefetchQuery({
    queryKey: [["poolsForUser"], { input: { username }, type: "query" }],
    queryFn: () => caller.poolsForUser({ username }),
  });

  if (!poolId) return;

  if (endpoint === "join" || endpoint === "edit") {
    await queryClient.prefetchQuery({
      queryKey: [["getPool"], { input: { poolId }, type: "query" }],
      queryFn: () => caller.getPool({ poolId }),
    });
  }

  await queryClient.prefetchQuery({
    queryKey: [["pool"], { input: { username, poolId }, type: "query" }],
    queryFn: () => caller.pool({ username, poolId }),
  });
  const poolMemberData = await caller.poolMemberLivesRemaining({ poolId });
  await queryClient.prefetchQuery({
    queryKey: [
      ["poolMemberLivesRemaining"],
      { input: { poolId }, type: "query" },
    ],
    queryFn: () => Promise.resolve(poolMemberData),
  });

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
