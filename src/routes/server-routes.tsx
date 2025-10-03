import {Route} from "react-router-dom";
import { Home } from "../pages/home/server";
import {withPage} from "../components/page-wrapper";
import {Heading} from "../components/heading";

export function ServerRoutes() {
    return (
        <Route>
            <Route path="/" element={withPage(Home)()} />
            {/*<Route path="/rules" element={<Rules />} />*/}
            {/*<Route path="/pool/:poolId" element={<Pool />} />*/}
            {/*<Route path="/picks/:poolId" element={<Picks />} />*/}
            {/*<Route path="/create" element={<Create />} />*/}
            {/*<Route path="/join/:poolId" element={<Join />} />*/}
            <Route path="*" element={<NotFound />} />
        </Route>
    )
}

const NotFound = withPage(() => <Heading>Not Found</Heading>);
