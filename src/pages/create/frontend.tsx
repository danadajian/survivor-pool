import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CopyInviteLinkButton } from "../../components/copy-invite-link-button";
import { Heading, Subheading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

const CreateComponent = ({ user }: PageProps) => {
  const utils = trpc.useUtils();
  const { mutate, data, isSuccess } = trpc.createPool.useMutation({
    throwOnError: true,
    onSettled: () => utils.poolsForUser.invalidate(),
  });
  const [poolName, setPoolName] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => mutate({ ...user, poolName });

  if (isSuccess && data?.poolId) {
    return (
      <>
        <Heading>{`${poolName} created successfully!`}</Heading>
        <Subheading>You are now a member of this pool.</Subheading>
        <div className="mt-4 flex">
          <CopyInviteLinkButton poolId={data.poolId} />
          <button
            onClick={() => navigate(`/pool/${data.poolId}`)}
            className="focus:shadow-outline mb-2 ml-8 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Make your first pick
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading>Create New Pool</Heading>
      <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="pb-6">
          <label
            className="text-md mb-2 block font-bold text-gray-700"
            htmlFor="poolName"
          >
            Pool Name
          </label>
          <input
            onChange={(event) => setPoolName(event.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="poolName"
            type="text"
          />
        </div>
        <button
          onClick={onSubmit}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Create
        </button>
      </form>
    </>
  );
};

export const Create = withPage(CreateComponent);
