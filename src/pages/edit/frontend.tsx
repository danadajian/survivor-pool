import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CopyInviteLinkButton } from "../../components/copy-invite-link-button";
import { ErrorMessage } from "../../components/error";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

const EditComponent = ({ poolId }: PageProps) => {
  const utils = trpc.useUtils();
  const [data] = trpc.getPool.useSuspenseQuery({ poolId });
  const { mutate, isSuccess } = trpc.editPool.useMutation({
    throwOnError: false,
    onSettled: (_, error) => {
      if (error) {
        setError(error.message);
      }
      utils.getPool.invalidate();
    },
  });
  const [poolName, setPoolName] = useState(data.name);
  const [lives, setLives] = useState(data.lives);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => mutate({ poolId, poolName, lives });

  if (isSuccess) {
    return (
      <>
        <Heading>{`${poolName} updated successfully!`}</Heading>
        <div className="flex-col">
          <button
            onClick={() => navigate(`/pool/${data.id}`)}
            className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Go to pool
          </button>
          <div className="mt-4 flex justify-center rounded bg-green-700/60 font-semibold">
            <CopyInviteLinkButton poolId={data.id} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading>Edit Pool</Heading>
      {error ? <ErrorMessage message={error} /> : null}
      <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="pb-6">
          <label
            className="text-md mb-2 block font-bold text-gray-700"
            htmlFor="poolName"
          >
            Pool Name
          </label>
          <input
            placeholder={poolName}
            onChange={(event) => setPoolName(event.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="poolName"
            type="text"
          />
        </div>
        <div className="pb-6">
          <label className="text-md mb-2 block font-bold text-gray-700">
            Number of Lives
          </label>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setLives(lives - 1)}
              disabled={lives <= 1}
              className="focus:shadow-outline mr-4 rounded-full border px-3 py-1 text-gray-700 shadow focus:outline-none"
            >
              -
            </button>
            <p>{lives}</p>
            <button
              type="button"
              onClick={() => setLives(lives + 1)}
              disabled={lives >= 9}
              className="focus:shadow-outline ml-4 rounded-full border px-3 py-1 text-gray-700 shadow focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Update
        </button>
      </form>
    </>
  );
};

export const Edit = withPage(EditComponent);
