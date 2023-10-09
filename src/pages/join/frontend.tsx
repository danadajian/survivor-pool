import React from "react";
import { useMatch, useNavigate } from "react-router-dom";

import { Error } from "../../components/error";
import { Header } from "../../components/header";
import { Loader } from "../../components/loader";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

const JoinComponent = ({ user }: PageProps) => {
  const { mutateAsync, isLoading, isSuccess, error } =
    trpc.joinPool.useMutation();
  const navigate = useNavigate();

  const path = useMatch("/join/:poolId");
  const poolId = path?.params.poolId;
  if (isLoading || !poolId) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  const joinPool = async () => {
    await mutateAsync({
      ...user,
      poolId,
    });
  };

  if (isSuccess) {
    return (
      <>
        <Header>You have joined the pool!</Header>
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
      <Header>Join New Pool</Header>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <p className="text-md block pb-8 font-bold text-gray-700">
          You have been invited to join a new survivor pool!
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
