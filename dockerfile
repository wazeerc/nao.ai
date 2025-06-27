FROM node:lts-alpine3.21 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm run build

# Production stage
FROM node:lts-alpine3.21

WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.output ./.output

RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]