FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY . .

RUN apk add --no-cache libc6-compat
RUN npm install @next/swc-linux-x64-musl
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

COPY package.json package-lock.json* ./
RUN apk add --no-cache libc6-compat
RUN npm ci --omit=dev

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules/@next/swc-linux-x64-musl ./node_modules/@next/swc-linux-x64-musl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
RUN chmod -R 755 /app

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
