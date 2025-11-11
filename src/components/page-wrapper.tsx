import { useUser } from "@clerk/clerk-react";
import React, { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import * as v from "valibot";

import { parseRoute } from "../utils/parse-route";
import { ErrorPage } from "./error";
import { Loader } from "./loader";
import { NavBar } from "./nav-bar";
import { useUserData } from "./user-context";

export const userFields = {
  username: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
} as const;
export const userSchema = v.object(userFields);

export type PageProps = {
  user: v.InferInput<typeof userSchema>;
  poolId: string;
};

export const withPage = (Component: React.FC<PageProps>) => () => {
  const PageComponent = () => {
    const { pathname } = useLocation();
    const { poolId = "" } = parseRoute(pathname);

    const clientUser = useUser();
    const { user: userResource, isLoaded } = useMemo(
      () => clientUser,
      [clientUser],
    );

    if (!isLoaded || !userResource) {
      return <Loader />;
    }

    let user: v.InferInput<typeof userSchema>;
    const serverUser = useUserData();
    if (serverUser) {
      user = serverUser;
    } else {
      const userInfo = {
        username: userResource.primaryEmailAddress?.emailAddress ?? "",
        firstName: userResource.firstName,
        lastName: userResource.lastName,
      };

      const result = v.safeParse(userSchema, userInfo);
      if (!result.success) {
        return <ErrorPage error={new Error("Invalid user data")} />;
      }
      user = result.output;
    }

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
