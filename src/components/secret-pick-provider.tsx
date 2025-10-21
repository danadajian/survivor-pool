import React, { createContext, PropsWithChildren, useState } from "react";

type SecretPickState = {
  pickIsSecret?: boolean;
  setPickIsSecret?: (state: boolean) => void;
};
export const SecretPickContext = createContext<SecretPickState>({});

export function SecretPickProvider({
  initialValue,
  children,
}: { initialValue: boolean } & PropsWithChildren) {
  const [pickIsSecret, setPickIsSecret] = useState(initialValue);

  return (
    <SecretPickContext.Provider value={{ pickIsSecret, setPickIsSecret }}>
      {children}
    </SecretPickContext.Provider>
  );
}
