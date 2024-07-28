FROM oven/bun:1.0.18

WORKDIR /app
COPY . .

RUN bun install

ENV PORT=8080
CMD [ "bun", "prod" ]
