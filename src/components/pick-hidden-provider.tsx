import { createContext, PropsWithChildren, useState } from "react";

type PickHiddenState = {
  pickHidden?: boolean;
  setPickHidden?: (state: boolean) => void;
};
export const PickHiddenContext = createContext<PickHiddenState>({});

export function PickHiddenProvider({
  initialValue,
  children,
}: { initialValue: boolean } & PropsWithChildren) {
  const [pickHidden, setPickHidden] = useState(initialValue);

  return (
    <PickHiddenContext.Provider value={{ pickHidden, setPickHidden }}>
      {children}
    </PickHiddenContext.Provider>
  );
}
