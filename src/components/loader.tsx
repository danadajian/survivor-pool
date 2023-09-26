import React from "react";

export const Loader = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex h-screen items-center justify-center">{text}</div>
);
