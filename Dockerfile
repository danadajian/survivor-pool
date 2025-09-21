FROM oven/bun:1.2.22

WORKDIR /app
COPY . .

RUN bun install

ENV PORT=8080
CMD [ "bun", "prod" ]
