import React from "react";
import {type PageProps} from "../../components/page-wrapper";
import { trpcServer } from "../../trpc";
import {Home as HomeClientComponent} from "./client";

export const Home = async (props: PageProps) => {
  // await trpcServer.poolsForUser.prefetch({ username: props.user.username });

  return <HomeClientComponent {...props} />;
};
