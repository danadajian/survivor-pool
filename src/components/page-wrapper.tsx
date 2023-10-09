import { useUser } from "@clerk/clerk-react";
import { type } from "arktype";
import React, { useMemo } from "react";

import { ClientProvider } from "./client-provider";
import { Error } from "./error";
import { Loader } from "./loader";
import { NavBar } from "./nav-bar";

export const userFields = {
  username: "string",
  "firstName?": "string",
  "lastName?": "string",
} as const;
const userSchema = type(userFields);

export type PageProps = {
  user: typeof userSchema.infer;
};

export const withPage = (Component: React.FC<PageProps>) => () => {
  const PageComponent = () => {
    const userResult = useUser();
    const { user: userResource } = useMemo(() => userResult, []);
    const userInfo = {
      username: userResource?.primaryEmailAddress?.emailAddress,
      ...(userResource?.firstName
        ? { firstName: userResource.firstName }
        : undefined),
      ...(userResource?.lastName
        ? { lastName: userResource.lastName }
        : undefined),
    };
    const { data: user, problems } = userSchema(userInfo);
    if (problems) {
      return <Error message={problems.summary} />;
    }
    if (!user) {
      return <Loader text={"Authenticating..."} />;
    }

    return (
      <ClientProvider>
        <NavBar />
        <div className="flex flex-col items-center pb-8 pt-16 text-center">
          <Component user={user} />
        </div>
      </ClientProvider>
    );
  };

  return <PageComponent />;
};
