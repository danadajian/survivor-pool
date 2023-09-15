import type { UserResource } from "@clerk/types";
import { useUser } from "@clerk/clerk-react";
import React, { useMemo } from "react";
import { ClientProvider } from "./client-provider";
import { Header } from "./header";

export const Page =
  (Component: React.FC<{ user: UserResource; username: string }>) => () => {
    const PageComponent = () => {
      const userResult = useUser();
      const { user } = useMemo(() => userResult, []);
      const username = user?.primaryEmailAddress?.emailAddress;
      if (!user || !username)
        return (
          <div className="flex h-screen items-center justify-center">
            Authenticating...
          </div>
        );

      return (
        <ClientProvider>
          <Header />
          <Component user={user} username={username} />
        </ClientProvider>
      );
    };

    return <PageComponent />;
  };
