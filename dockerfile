FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.output ./.output

RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]