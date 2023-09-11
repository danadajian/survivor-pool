FROM oven/bun

WORKDIR /app
COPY --chown=admin . .

RUN bun install
RUN bun transpile

ENV NODE_ENV production
CMD [ "bun", "start" ]
