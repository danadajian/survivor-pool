import { environmentVariables } from "./env";

export const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZHJpdmVuLXNwYXJyb3ctNDguY2xlcmsuYWNjb3VudHMuZGV2JA";
export const isDev = environmentVariables.ENVIRONMENT === "development";
