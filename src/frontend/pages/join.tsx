import React from "react";
import { type PageProps, withPage } from "../page-wrapper";
import { trpc } from "../trpc";
import { Loader } from "../loader";
import { useMatch } from "react-router-dom";

const JoinComponent = ({ user: { username } }: PageProps) => {
  const { mutateAsync, isLoading, isSuccess } = trpc.joinPool.useMutation();

  const resolvedPath = useMatch("/join/:poolId");
  const poolId = Number(resolvedPath?.params.poolId);
  if (isLoading || !poolId) {
    return <Loader />;
  }

  const onClick = async () => {
    await mutateAsync({
      username,
      poolId,
    });
  };

  return (
    <>
      <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">
        {isSuccess ? "You have joined the pool!" : "Join New Pool"}
      </h1>
      {!isSuccess && (
        <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <p className="text-md block pb-8 font-bold text-gray-700">
            You have been invited to join a new survivor pool!
          </p>
          <button
            onClick={onClick}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Join
          </button>
        </div>
      )}
    </>
  );
};

export const Join = withPage(JoinComponent);
