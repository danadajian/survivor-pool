import React from "react";
import { Home } from "./pages/home";
import { Pick } from "./pages/pick";
import { Pools } from "./pages/pools";
import { Create } from "./pages/create";
import { Join } from "./pages/join";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pick/:poolId",
    element: <Pick />,
  },
  {
    path: "/pools/:poolId",
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
