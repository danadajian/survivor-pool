import React from "react";

export const Heading = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const baseClasses =
    "text-3xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-4xl";
  const classes = className
    ? `${baseClasses} ${className}`
    : `${baseClasses} text-left`;

  return <h1 className={classes}>{children}</h1>;
};

export const Subheading = ({ children }: React.PropsWithChildren) => (
  <h2 className="text-left text-lg font-semibold text-slate-600">{children}</h2>
);
