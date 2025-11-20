FROM oven/bun:1.3.2

WORKDIR /app
COPY . .

RUN bun install --production

ENV PORT=8080

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD [ "bun", "prod" ]
