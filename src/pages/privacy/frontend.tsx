import React from "react";

import { withPage } from "../../components/page-wrapper";
import { PrivacyContent } from "./privacy-content";

const PrivacyComponent = () => {
  return <PrivacyContent />;
};

export const Privacy = withPage(PrivacyComponent);
