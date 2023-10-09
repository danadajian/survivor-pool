import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Error } from "../../components/error";
import { Header } from "../../components/header";
import { Loader } from "../../components/loader";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { trpc } from "../../trpc";

const CreateComponent = ({ user }: PageProps) => {
  const { mutateAsync, data, isLoading, isSuccess, error } =
    trpc.createPool.useMutation();
  const [poolName, setPoolName] = useState("");
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = async () => {
    await mutateAsync({
      ...user,
      poolName,
    });
  };

  if (isSuccess && data?.poolId) {
    return (
      <>
        <Header>{`${poolName} created successfully!`}</Header>
        <div className="flex">
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `${window.location.origin}/join/${data.poolId}`,
              )
            }
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Copy invite link
          </button>
          <button
            onClick={() => navigate(`/pick/${data.poolId}`)}
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
      <Header>Create New Pool</Header>
      {error && <Error message={error.message} />}
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
