import pino from "pino";

import { isDev } from "../env";

export const logger = pino({
  level: "info",
  timestamp: false,
  base: {}, // Remove pid, hostname, and other default fields
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
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
