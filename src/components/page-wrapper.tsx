import { useUser } from "@clerk/clerk-react";
import React, { Suspense, useMemo } from "react";
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

    let user: v.InferInput<typeof userSchema>;
    const serverUser = useUserData();
    if (serverUser) {
      user = serverUser;
    } else {
      if (!isLoaded || !userResource) {
        return <Loader />;
      }

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
        <NavBar />
        <Suspense fallback={<Loader />}>
          <div className="relative min-h-screen w-full">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_62%)]" />
            <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 pt-24 pb-12 text-left sm:gap-8 sm:px-6 sm:pt-28 sm:pb-16">
              <Component user={user} poolId={poolId} />
            </div>
          </div>
        </Suspense>
      </>
    );
  };

  return <PageComponent />;
};
