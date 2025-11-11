import React from "react";

export const Heading = ({ children }: React.PropsWithChildren) => (
  <h1 className="text-left text-3xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-4xl">
    {children}
  </h1>
);

export const Subheading = ({ children }: React.PropsWithChildren) => (
  <h2 className="text-left text-lg font-semibold text-slate-600">{children}</h2>
);
