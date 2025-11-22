import React from "react";

import { RulesContent } from "./rules-content";

export const PublicRules = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_62%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 pt-24 pb-12 text-left sm:gap-8 sm:px-6 sm:pt-28 sm:pb-16">
        <RulesContent />
      </div>
    </div>
  );
};
