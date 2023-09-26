FROM oven/bun

WORKDIR /app
COPY . .

RUN bun install
RUN bun css

ENV PORT 8080
CMD [ "bun", "prod" ]
