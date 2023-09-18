import { useUser } from "@clerk/clerk-react";
import { type } from "arktype";
import React, { useMemo } from "react";

import { ClientProvider } from "./client-provider";
import { Header } from "./header";
import { Loader } from "./loader";

export const userSchema = type({
  username: "string",
  firstName: "string",
});

export type PageProps = {
  user: typeof userSchema.infer;
};

export const withPage = (Component: React.FC<PageProps>) => () => {
  const PageComponent = () => {
    const userResult = useUser();
    const { user: userResource } = useMemo(() => userResult, []);
    const user = {
      username: userResource?.primaryEmailAddress?.emailAddress,
      firstName: userResource?.firstName,
    };
    const { data: validatedUser } = userSchema(user);
    if (!validatedUser) {
      return <Loader text={"Authenticating..."} />;
    }

    return (
      <ClientProvider>
        <Header />
        <div className="flex flex-col items-center pb-8 pt-16 text-center">
          <Component user={validatedUser} />
        </div>
      </ClientProvider>
    );
  };

  return <PageComponent />;
};
