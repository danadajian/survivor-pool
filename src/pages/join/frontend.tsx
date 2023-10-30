import React from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/header";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

const JoinComponent = ({ user, poolId }: PageProps) => {
  const { mutateAsync, isSuccess } = trpc.joinPool.useMutation();
  const navigate = useNavigate();

  const [pool] = trpc.getPool.useSuspenseQuery({ poolId });

  const joinPool = async () => {
    await mutateAsync({
      ...user,
      poolId,
    });
  };

  if (isSuccess) {
    return (
      <>
        <Header>You have joined {pool.name}!</Header>
        <button
          onClick={() => navigate(`/pick/${poolId}`)}
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
      <Header>Join New Survivor Pool</Header>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
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
