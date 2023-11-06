import { trpc } from "../trpc";

export function usePrefetch({
  username,
  poolIds,
}: {
  username?: string;
  poolIds: string[];
}) {
  const utils = trpc.useUtils();

  if (username && poolIds.every(Boolean)) {
    poolIds.forEach(async (poolId) => {
      await utils.pick.prefetch({ username, poolId });
      await utils.picksForPool.prefetch({ poolId });
    });
  }
}
