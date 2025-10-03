import {Route} from "react-router-dom";
import {withPage} from "../components/page-wrapper";
import {Home} from "../pages/home/client";
import {Heading} from "../components/heading";

export function ClientRoutes() {
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
