# syntax=docker/dockerfile:1
# ─── Strapi 5 (production) ────────────────────────────────

FROM node:22-alpine AS build
# Outils de compilation pour les modules natifs éventuels (better-sqlite3 optionnel, sharp en secours)
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /opt/app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
# devDependencies nécessaires au build TypeScript / admin, retirées ensuite
RUN npm ci --include=dev --no-audit --no-fund

COPY . .
ARG PUBLIC_URL=http://localhost:1337
ENV PUBLIC_URL=${PUBLIC_URL}
RUN npm run build && npm prune --omit=dev --no-audit --no-fund

# ─── Image d'exécution ────────────────────────────────────
FROM node:22-alpine AS run
RUN apk add --no-cache libc6-compat
WORKDIR /opt/app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=1337

COPY --from=build --chown=node:node /opt/app ./
# Dossier des médias (monté en volume) inscriptible par l'utilisateur non root
RUN mkdir -p public/uploads && chown -R node:node public/uploads

USER node
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=5 \
  CMD wget -qO- http://127.0.0.1:1337/_health > /dev/null || exit 1

CMD ["npm", "run", "start"]
