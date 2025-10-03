"use client";

import {PageProps} from "../../components/page-wrapper";
import {Heading} from "../../components/heading";
import React from "react";
import {trpcClient} from "../../components/client-provider";
import {DeletePoolButton} from "../../components/delete-pool-button";
import {CopyInviteLinkButton} from "../../components/copy-invite-link-button";
import spacetime from "spacetime";
import {useNavigate} from "react-router-dom";
import {RouterOutput} from "../../trpc";

export const Home = ({ user: { username } }: PageProps) => {
    const data = trpcClient.poolsForUser.useQuery({ username });
    return (
        <>
            <Heading>Welcome to Survivor Pool!</Heading>
            <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
                <PoolSelect data={data as any} username={username} />
            </div>
            <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
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
                <p className="block text-lg font-bold text-gray-700">
                    You have not joined any pools.
                </p>
            </>
        );
    }

    console.log('rendering', spacetime.now().format(`{day} {hour}:{minute-pad}:{second-pad}:{millisecond-pad} {ampm}`))

    return (
        <>
            <p className="block pb-8 text-lg font-bold text-gray-700">
                Select a pool:
            </p>
            <div className="flex flex-col justify-around">
                {data.map(({ poolId, poolName, creator }, index) => (
                    <div key={index} className="m-2 flex items-center justify-between">
                        <button
                            key={poolId}
                            id={poolId}
                            onClick={(event) => navigate(`/pool/${event.currentTarget.id}`)}
                            className="focus:shadow-outline mr-4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700 focus:outline-none"
                            type="button"
                        >
                            <p className="px-4 py-2">{poolName}</p>
                        </button>
                        {username === creator ? (
                            <div className="flex items-center">
                                <CopyInviteLinkButton poolId={poolId} />
                                <DeletePoolButton key={poolId} poolId={poolId} />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </>
    );
};
