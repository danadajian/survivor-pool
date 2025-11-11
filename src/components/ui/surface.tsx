import React from "react";

export type SurfaceProps = React.HTMLAttributes<HTMLDivElement>;

const baseClasses =
  "w-full rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-6";

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, ...props }, ref) => {
    const classes = [baseClasses, className].filter(Boolean).join(" ");
    return <div ref={ref} className={classes} {...props} />;
  },
);

Surface.displayName = "Surface";


