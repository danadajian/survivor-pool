import React from "react";

export const Header = ({ children }: React.PropsWithChildren) => (
  <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">{children}</h1>
);
