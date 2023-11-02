import { useUser } from "@clerk/clerk-react";
import { type } from "arktype";
import React, { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useMatch } from "react-router-dom";

import { ClientProvider } from "./client-provider";
import { Error } from "./error";
import { Loader } from "./loader";
import { NavBar } from "./nav-bar";

export const userFields = {
  username: "string>0",
  "firstName?": "string>0 | null",
  "lastName?": "string>0 | null",
} as const;
const userSchema = type(userFields);

export type PageProps = {
  user: typeof userSchema.infer;
  poolId: string;
};

export const withPage = (Component: React.FC<PageProps>) => () => {
  const PageComponent = () => {
    const location = useLocation();
    const currentRoute = location.pathname.split("/")[1];
    const path = currentRoute ? useMatch(`/${currentRoute}/:poolId`) : null;
    const poolId = path?.params.poolId ?? "";

    const userResult = useUser();
    const { user: userResource } = useMemo(() => userResult, []);
    const userInfo = {
      username: userResource?.primaryEmailAddress?.emailAddress,
      firstName: userResource?.firstName,
      lastName: userResource?.lastName,
    };
    const { data: user, problems } = userSchema(userInfo);
    if (problems) {
      return <Error message={problems.summary} />;
    }

    return (
      <ClientProvider>
        <NavBar />
        <ErrorBoundary
          FallbackComponent={({ error }) => (
            <Error message={(error as Error).message} />
          )}
        >
          <Suspense fallback={<Loader />}>
            <div className="flex flex-col items-center pt-16 text-center">
              <Component user={user} poolId={poolId} />
            </div>
          </Suspense>
        </ErrorBoundary>
      </ClientProvider>
    );
  };

  return <PageComponent />;
};
