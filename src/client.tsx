/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from "react";
import { hydrateRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

import { Routing} from "./app";

const root = document.getElementById('root');
if (root) {
    hydrateRoot(
        root,
        <RouterProvider router={
            createBrowserRouter(
                createRoutesFromElements(
                    Routing()
                )
            )
        } />,
    );
}
