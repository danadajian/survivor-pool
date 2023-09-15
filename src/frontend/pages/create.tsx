import React, { useState } from "react";
import { type PageProps, withPage } from "../page-wrapper";
import { trpc } from "../trpc";
import { Loader } from "../loader";

const CreateComponent = ({ user: { username } }: PageProps) => {
  const { mutateAsync, isLoading, isSuccess } = trpc.createPool.useMutation();
  const [poolName, setPoolName] = useState("");

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = async () => {
    await mutateAsync({
      name: poolName,
      creator: username,
    });
  };

  return (
    <>
      <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">
        {isSuccess
          ? `Pool ${poolName} created successfully!`
          : "Create New Pool"}
      </h1>
      {!isSuccess && (
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
      )}
    </>
  );
};

export const Create = withPage(CreateComponent);
