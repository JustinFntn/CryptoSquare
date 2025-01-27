FROM node:latest AS base

ARG PORT=3000

WORKDIR /app

FROM base AS builder

RUN npm install -g pnpm

COPY --link package*.json pnpm-lock.yaml ./
RUN pnpm install

COPY --link . .

RUN pnpm run build

FROM base AS runner

ENV PORT=${PORT}
ENV NODE_ENV=development

COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]