import React from "react";
import { type PageProps, withPage } from "./page-wrapper";
import { trpc } from "./trpc";
import { Loader } from "./loader";

const PoolsComponent = ({ user: { username } }: PageProps) => {
  const { data } = trpc.picksForPool.useQuery({ poolId: 1 });

  if (!data) {
    return <Loader />;
  }

  return <>{JSON.stringify(data)}</>;
};

export const Pools = withPage(PoolsComponent);
