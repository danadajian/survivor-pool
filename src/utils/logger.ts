import pino from "pino";

import { environmentVariables } from "../env";

const isDev = environmentVariables.ENVIRONMENT === "development";

export const logger = pino({
  level: "info",
  timestamp: false,
  base: {}, // Remove pid, hostname, and other default fields
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname",
      },
    },
  }),
});
