import React from "react";

export const Heading = ({ children }: React.PropsWithChildren) => (
  <h1 className="pb-8 pt-8 text-2xl font-bold text-red-700">{children}</h1>
);

export const Subheading = ({ children }: React.PropsWithChildren) => (
  <h2 className="pb-4 pt-4 text-lg font-bold text-slate-700">{children}</h2>
);
