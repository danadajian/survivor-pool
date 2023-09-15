import React from "react";
import { Picks } from "./pages/picks";
import { Pools } from "./pages/pools";
import { Create } from "./pages/create";

export const routes = [
  {
    path: "/",
    element: <Picks />,
  },
  {
    path: "/pools",
    element: <Pools />,
  },
  {
    path: "/create",
    element: <Create />,
  },
];
