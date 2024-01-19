FROM oven/bun

WORKDIR /app

ENV NODE_ENV="production"

COPY package.json .
RUN bun i
COPY . .
EXPOSE 4004
CMD ["bun", "run", "dev", "--host"]

