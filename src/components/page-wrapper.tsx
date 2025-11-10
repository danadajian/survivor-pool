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
    const { poolId } = parseRoute(pathname);
    const poolIdString = poolId ?? "";

    // Try to get user data from server-provided context first
    const serverUserData = useUserData();

    // Fall back to Clerk's useUser hook if no server data
    const userResult = useUser();
    const { user: userResource, isLoaded } = useMemo(
      () => userResult,
      [userResult],
    );

    let user: v.InferInput<typeof userSchema>;

    if (serverUserData) {
      // Use server-provided user data (SSR)
      user = serverUserData;
    } else {
      // Use Clerk's useUser hook (client-side)
      // Wait for user data to load before parsing
      if (!isLoaded || !userResource) {
        return <Loader />;
      }

      const userInfo = {
        username: userResource.primaryEmailAddress?.emailAddress ?? "",
        firstName: userResource.firstName,
        lastName: userResource.lastName,
      };

      // Use safeParse to handle validation errors gracefully
      const result = v.safeParse(userSchema, userInfo);
      if (!result.success) {
        // If validation fails, show error or fallback
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
              <Component user={user} poolId={poolIdString} />
            </div>
          </Suspense>
        </ErrorBoundary>
      </>
    );
  };

  return <PageComponent />;
};
