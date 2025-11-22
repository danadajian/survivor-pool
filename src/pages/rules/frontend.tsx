import React from "react";

import { withPage } from "../../components/page-wrapper";
import { RulesContent } from "./rules-content";

const RulesComponent = () => {
  return <RulesContent />;
};

export const Rules = withPage(RulesComponent);
