import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Heading, Subheading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

const CreateComponent = ({ user }: PageProps) => {
  const { mutate, data, isSuccess } = trpc.createPool.useMutation({
    throwOnError: true,
  });
  const [poolName, setPoolName] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const onSubmit = () =>
    mutate({
      ...user,
      poolName,
    });

  const copyButtonClasses = copied
    ? "bg-green-500 opacity-30"
    : "bg-blue-500 hover:bg-blue-700";
  const copyButtonText = copied ? "Copied!" : "Copy invite link";

  if (isSuccess && data?.poolId) {
    return (
      <>
        <Heading>{`${poolName} created successfully!`}</Heading>
        <Subheading>You are now a member of this pool.</Subheading>
        <div className="flex">
          <button
            onClick={() => {
              setCopied(true);
              void navigator.clipboard.writeText(
                `${window.location.origin}/join/${data.poolId}`,
              );
            }}
            disabled={copied}
            className={`focus:shadow-outline rounded px-4 py-2 font-bold text-white focus:outline-none ${copyButtonClasses}`}
            type="button"
          >
            {copyButtonText}
          </button>
          <button
            onClick={() => navigate(`/pool/${data.poolId}`)}
            className="focus:shadow-outline ml-8 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
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
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
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
