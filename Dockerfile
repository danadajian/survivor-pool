FROM oven/bun:1.3.2

WORKDIR /app
COPY . .

RUN bun install --production
RUN bun tailwind

ENV PORT=8080
ENV ENVIRONMENT=production

CMD [ "bun", "start" ]
