FROM oven/bun:1.3.0

WORKDIR /app
COPY . .

RUN bun install

ENV PORT=8080
CMD [ "bun", "prod" ]
