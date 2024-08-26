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
    return poolIds.map(async (poolId) => {
      await utils.pool.prefetch({ username, poolId });
      await utils.picksForPool.prefetch({ poolId });
    });
  }
}
