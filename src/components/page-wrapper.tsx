import {ClerkProvider, useUser} from "@clerk/react-router";
import React, { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useMatch } from "react-router-dom";
import * as v from "valibot";

import {CLERK_PUBLISHABLE_KEY} from "../constants";
import {HydrateClient} from "../trpc";
import {userFields} from "../user";
import { useEndpoint } from "../utils/use-endpoint";
import {ClientProvider} from "./client-provider";
import { ErrorPage } from "./error";
import { Loader } from "./loader";
import { NavBar } from "./nav-bar";

const userSchema = v.object(userFields);

export type PageProps = {
  user: v.InferInput<typeof userSchema>;
  poolId: string;
};

export const withPage = (Component: React.FC<PageProps>) => () => {
  const PageComponent = () => {
    const endpoint = useEndpoint();
    const path = endpoint ? useMatch(`/${endpoint}/:poolId`) : null;
    const poolId = path?.params.poolId ?? "";

    // const userResult = useUser();
    // const { user: userResource } = useMemo(() => userResult, []);
    const userInfo = {
      username: 'danadajian@gmail.com',
      firstName: 'Dan',
      // lastName: userResource?.lastName,
    };
    const user = v.parse(userSchema, userInfo);

    return (
      <>
            <ClientProvider>
          <HydrateClient>
        <ErrorBoundary
          fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
        >
          <NavBar />
          <Suspense fallback={<Loader />}>
            <div className="flex flex-col items-center pt-16 text-center">
              <Component user={user} poolId={poolId} />
            </div>
          </Suspense>
        </ErrorBoundary>
          </HydrateClient>
            </ClientProvider>
      </>
    );
  };

  return (
      // <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
          <PageComponent />
      // </ClerkProvider>
  );
};
