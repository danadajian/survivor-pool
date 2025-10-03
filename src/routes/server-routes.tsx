import {Route, Routes} from "react-router-dom";
import { Home } from "../pages/home/server";
import { withPage } from "../components/page-wrapper";
import {Heading} from "../components/heading";
import React from "react";

export function ServerRoutes() {
    return (
        <Routes>
            <Route path="/" element={withPage(Home)()} />
            {/*<Route path="/rules" element={<Rules />} />*/}
            {/*<Route path="/pool/:poolId" element={<Pool />} />*/}
            {/*<Route path="/picks/:poolId" element={<Picks />} />*/}
            {/*<Route path="/create" element={<Create />} />*/}
            {/*<Route path="/join/:poolId" element={<Join />} />*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

const NotFound = withPage(() => <Heading>Not Found</Heading>);
