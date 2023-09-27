import React from "react";

export const Error = ({ message }: { message: string }) => (
  <div className="pb-8 pt-8 text-lg font-bold text-red-700">{message}</div>
);
