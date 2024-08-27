import React from "react";
import { useNavigate } from "react-router-dom";

import { CopyInviteLinkButton } from "../../components/copy-invite-link-button";
import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { type RouterOutput, trpc } from "../../trpc";

const HomeComponent = ({ user: { username } }: PageProps) => {
  const [data] = trpc.poolsForUser.useSuspenseQuery({ username });

  return (
    <>
      <Heading>Welcome to Survivor Pool!</Heading>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <PoolSelect data={data} username={username} />
      </div>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <CreatePoolLink />
      </div>
    </>
  );
};

const CreatePoolLink = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/create`)}
      className="focus:shadow-outline my-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      type="button"
    >
      Create New Pool
    </button>
  );
};

const PoolSelect = ({
  data,
  username,
}: {
  data: RouterOutput["poolsForUser"];
  username: string;
}) => {
  const navigate = useNavigate();

  if (!data.length) {
    return (
      <>
        <p className="text-md block pb-8 font-bold text-gray-700">
          You have not joined any pools.
        </p>
        <CreatePoolLink />
      </>
    );
  }

  return (
    <>
      <p className="text-md block pb-8 font-bold text-gray-700">
        Select a pool:
      </p>
      <div className="flex flex-col justify-around">
        {data.map(({ poolId, poolName, creator }) => (
          <div className="flex-row">
            <button
              key={poolId}
              id={String(poolId)}
              onClick={(event) => navigate(`/pool/${event.currentTarget.id}`)}
              className="focus:shadow-outline m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="button"
            >
              {poolName}
            </button>
            {username === creator ? (
              <CopyInviteLinkButton poolId={poolId} />
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export const Home = withPage(HomeComponent);
