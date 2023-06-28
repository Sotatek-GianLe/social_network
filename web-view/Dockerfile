# Install dependencies only when needed
FROM node:16-alpine AS development
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN npm build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 socialgroup
RUN adduser --system --uid 1001 socialuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=socialuser:socialgroup /app/.next/standalone ./
COPY --from=builder --chown=socialuser:socialgroup /app/.next/static ./.next/static

USER socialuser

EXPOSE 8888

ENV PORT 8888

CMD ["node", "server.js"]