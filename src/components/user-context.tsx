import React, {
  createContext,
  type PropsWithChildren,
  useContext,
} from "react";
import * as v from "valibot";

import { userSchema } from "./page-wrapper";

export type UserData = v.InferInput<typeof userSchema>;

const UserContext = createContext<UserData | null>(null);

export const UserProvider = ({
  children,
  userData,
}: PropsWithChildren<{ userData?: UserData }>) => {
  return (
    <UserContext.Provider value={userData ?? null}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
