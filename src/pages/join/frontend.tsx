import React from "react";
import { useNavigate } from "react-router-dom";

import {trpcClient} from "../../components/client-provider";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import {trpcServer} from "../../trpc";

const JoinComponent = async ({ user, poolId }: PageProps) => {
  const { mutate, isSuccess } = trpcClient.joinPool.useMutation();
  const navigate = useNavigate();

  const pool = await trpcServer.getPool({ poolId });

  const joinPool = () =>
    mutate({
      ...user,
      poolId,
    });

  if (isSuccess) {
    return (
      <>
        <Heading>You have joined {pool.name}!</Heading>
        <button
          onClick={() => navigate(`/pool/${poolId}`)}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Make your first pick
        </button>
      </>
    );
  }

  return (
    <>
      <Heading>Join New Survivor Pool</Heading>
      <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <p className="text-md block pb-8 font-bold text-gray-700">
          You have been invited to join {pool.name}!
        </p>
        <button
          onClick={joinPool}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Join
        </button>
      </div>
    </>
  );
};

export const Join = withPage(JoinComponent);
