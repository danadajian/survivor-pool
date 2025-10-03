import React from "react";
import {type PageProps} from "../../components/page-wrapper";
import {HydrateClient, trpcServer} from "../../trpc";
import {Home as HomeClientComponent} from "./client";
import spacetime from "spacetime";

export const Home = async (props: PageProps) => {
    void trpcServer.poolsForUser.prefetch({ username: props.user.username });
    console.log('Rendering server', spacetime.now().format("{day} {hour}:{minute-pad}:{second-pad}:{millisecond-pad} {ampm}"));

    return <HydrateClient><HomeClientComponent {...props} /></HydrateClient>;
};
