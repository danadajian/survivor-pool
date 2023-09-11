FROM oven/bun

WORKDIR /app
COPY --chown=admin . .

RUN bun install
RUN bun transpile

ENV NODE_ENV production
ENV PORT 8080
CMD [ "bun", "start" ]
