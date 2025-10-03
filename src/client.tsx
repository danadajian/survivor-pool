/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from "react";
import { hydrateRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import {ClientProvider} from "./components/client-provider";
import {ClientRoutes} from "./routes/client-routes";

const root = document.getElementById('root');
if (root) {
    hydrateRoot(
        root,
        <ClientProvider>
            <RouterProvider router={
                createBrowserRouter(
                    createRoutesFromElements(
                        ClientRoutes()
                    )
                )
            } />
        </ClientProvider>
    );
}
