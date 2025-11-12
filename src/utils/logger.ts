import pino from "pino";

export const logger = pino({
  level: "info",
  timestamp: false,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
    },
  },
});
