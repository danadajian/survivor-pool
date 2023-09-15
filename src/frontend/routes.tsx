import React from "react";
import { Picks } from "./pages/picks";
import { Pools } from "./pages/pools";
import { Create } from "./pages/create";
import { Join } from "./pages/join";

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
  {
    path: "/join/:poolId",
    element: <Join />,
  },
];
