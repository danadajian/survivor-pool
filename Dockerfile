FROM oven/bun

WORKDIR /app
COPY --chown=admin . .

RUN bun install
RUN bun run build

ENV NODE_ENV production
CMD [ "bun", "start" ]
