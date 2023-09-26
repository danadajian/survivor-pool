import React from "react";
import { useNavigate } from "react-router-dom";

import { Error } from "../error";
import { Loader } from "../loader";
import { type PageProps, withPage } from "../page-wrapper";
import { trpc } from "../trpc";

const HomeComponent = ({ user: { username } }: PageProps) => {
  const { data, isLoading, error } = trpc.poolsForUser.useQuery({ username });
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">
        Welcome to Survival Pool!
      </h1>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <p className="text-md block pb-8 font-bold text-gray-700">
          Select a pool:
        </p>
        {data.map(({ poolId, poolName }) => (
          <button
            key={poolId}
            id={String(poolId)}
            onClick={(event) => navigate(`/pick/${event.currentTarget.id}`)}
            className="focus:shadow-outline ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
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
