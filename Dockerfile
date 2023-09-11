FROM oven/bun

WORKDIR /app
COPY . .

RUN bun install
RUN bun transpile

ENV PORT 8080
CMD [ "bun", "start" ]
