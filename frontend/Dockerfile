# syntax=docker/dockerfile:1
# ─── Next.js 16 (sortie « standalone ») ───────────────────

FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables publiques : intégrées au JavaScript au moment du build.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
ARG NEXT_PUBLIC_GA_ID=""
ARG EXTRA_IMAGE_HOSTS=""
# Strapi joignable pendant le build (pré-génération des pages). Voir docker-compose.yml (network: host).
ARG STRAPI_API_URL=http://127.0.0.1:1337
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_MEDIA_URL=${NEXT_PUBLIC_MEDIA_URL} \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY} \
    NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID} \
    EXTRA_IMAGE_HOSTS=${EXTRA_IMAGE_HOSTS} \
    STRAPI_API_URL=${STRAPI_API_URL} \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Le token Strapi est fourni comme secret BuildKit (facultatif : les contenus publiés sont aussi
# lisibles sans token) ; il n'est jamais écrit dans une couche de l'image.
RUN --mount=type=secret,id=strapi_api_token,env=STRAPI_API_TOKEN npm run build

# ─── Image d'exécution ────────────────────────────────────
FROM node:22-alpine AS run
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
# .next/standalone contient déjà .next/static et public (copiés par scripts/postbuild.mjs)
COPY --from=build --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nextjs --chmod=755 /app/docker-entrypoint.sh ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt > /dev/null || exit 1

# Lance server.js puis invalide le cache ISR dès que Strapi est joignable
CMD ["./docker-entrypoint.sh"]
