import { useUser } from "@clerk/clerk-react";
import React, { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useMatch } from "react-router-dom";
import * as v from "valibot";

import { useEndpoint } from "../utils/use-endpoint";
import { usePrefetch } from "../utils/use-prefetch";
import { ErrorPage } from "./error";
import { Loader } from "./loader";
import { NavBar } from "./nav-bar";

export const userFields = {
  username: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
} as const;
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

    const userResult = useUser();
    const { user: userResource } = useMemo(() => userResult, []);
    const userInfo = {
      username: userResource?.primaryEmailAddress?.emailAddress,
      firstName: userResource?.firstName,
      lastName: userResource?.lastName,
    };
    const user = v.parse(userSchema, userInfo);
    usePrefetch({ username: user?.username, poolIds: [poolId] });

    return (
      <>
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
      </>
    );
  };

  return <PageComponent />;
};
