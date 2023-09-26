import React from "react";

import { Header } from "../header";
import { withPage } from "../page-wrapper";

const NotFoundComponent = () => <Header>Not Found</Header>;

export const NotFound = withPage(NotFoundComponent);
