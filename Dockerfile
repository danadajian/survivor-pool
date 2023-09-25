FROM oven/bun

ARG CLERK_PUBLISHABLE_KEY

WORKDIR /app
COPY . .

RUN bun install
RUN bun css

ENV PORT 8080
CMD [ "bun", "start" ]
