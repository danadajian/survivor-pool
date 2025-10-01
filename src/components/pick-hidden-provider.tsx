import { createContext, PropsWithChildren, useState } from "react";

type PickHiddenState = {
  pickHidden?: boolean;
  setPickHidden?: (state: boolean) => void;
};
export const PickHiddenContext = createContext<PickHiddenState>({});

export function PickHiddenProvider({ children }: PropsWithChildren) {
  const [pickHidden, setPickHidden] = useState(false);

  return (
    <PickHiddenContext.Provider value={{ pickHidden, setPickHidden }}>
      {children}
    </PickHiddenContext.Provider>
  );
}
