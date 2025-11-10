import React, {
  createContext,
  type PropsWithChildren,
  useContext,
} from "react";
import * as v from "valibot";

import { userSchema } from "./page-wrapper";

type UserData = v.InferInput<typeof userSchema> | null;

const UserContext = createContext<UserData>(null);

export const UserProvider = ({
  children,
  userData,
}: PropsWithChildren<{ userData: UserData }>) => {
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
