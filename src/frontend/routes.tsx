import React from "react";

import { Create } from "./pages/create";
import { Home } from "./pages/home";
import { Join } from "./pages/join";
import { Pick } from "./pages/pick";
import { Pools } from "./pages/pools";

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
