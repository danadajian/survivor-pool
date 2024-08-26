import React from "react";
import { useNavigate } from "react-router-dom";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { type RouterOutput, trpc } from "../../trpc";
import { usePrefetch } from "../../utils/use-prefetch";

const HomeComponent = ({ user: { username } }: PageProps) => {
  const [data] = trpc.poolsForUser.useSuspenseQuery({ username });

  usePrefetch({ poolIds: data.map(({ poolId }) => poolId), username });

  return (
    <>
      <Heading>Welcome to Survivor Pool!</Heading>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <PoolSelect data={data} />
      </div>
    </>
  );
};

const PoolSelect = ({ data }: { data: RouterOutput["poolsForUser"] }) => {
  const navigate = useNavigate();

  if (!data.length) {
    return (
      <>
        <p className="text-md block pb-8 font-bold text-gray-700">
          Create your first pool:
        </p>
        <button
          onClick={() => navigate(`/create`)}
          className="focus:shadow-outline my-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Create Pool
        </button>
      </>
    );
  }

  return (
    <>
      <p className="text-md block pb-8 font-bold text-gray-700">
        Select a pool:
      </p>
      <div className="flex flex-col justify-around">
        {data.map(({ poolId, poolName }) => (
          <button
            key={poolId}
            id={String(poolId)}
            onClick={(event) => navigate(`/pool/${event.currentTarget.id}`)}
            className="focus:shadow-outline my-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            {poolName}
          </button>
        ))}
      </div>
    </>
  );
};

export const Home = withPage(HomeComponent);
