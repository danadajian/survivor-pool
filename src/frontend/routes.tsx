import React from "react";
import { Picks } from "./picks";
import { Pools } from "./pools";

export const routes = [
  {
    path: "/",
    element: <Picks />,
  },
  {
    path: "/pools",
    element: <Pools />,
  },
];
