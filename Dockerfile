FROM oven/bun:1.3.4

WORKDIR /app
COPY . .

RUN bun install --production
RUN bun tailwind

ENV PORT=8080
ENV ENVIRONMENT=production

# Ensure the container logs to stdout rather than stderr
CMD [ "sh", "-c", "exec bun start 2>&1" ]
