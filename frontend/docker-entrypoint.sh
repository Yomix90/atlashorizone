#!/bin/sh
# Démarre Next.js puis, dès que Strapi répond, invalide tout le cache ISR une fois.
# Utile quand l'image a été construite alors que Strapi n'était pas encore joignable
# (premier déploiement Dokploy, build sur une autre machine…) : les pages se régénèrent
# avec les vrais contenus sans attendre l'expiration du cache.
set -u

PORT="${PORT:-3000}"
node server.js &
SERVER_PID=$!
trap 'kill -TERM "$SERVER_PID" 2>/dev/null' TERM INT

warmup() {
  [ -n "${REVALIDATE_SECRET:-}" ] && [ -n "${STRAPI_API_URL:-}" ] || return 0
  i=0
  # Jusqu'à 10 minutes (Strapi applique ses migrations au premier démarrage)
  while [ "$i" -lt 120 ]; do
    if wget -q -O /dev/null "http://127.0.0.1:${PORT}/robots.txt" 2>/dev/null \
      && wget -q -O /dev/null "${STRAPI_API_URL%/}/_health" 2>/dev/null; then
      if wget -q -O /dev/null \
        --header="x-revalidate-secret: ${REVALIDATE_SECRET}" \
        --header="Content-Type: application/json" \
        --post-data='{"all":true}' \
        "http://127.0.0.1:${PORT}/api/revalidate"; then
        echo "[entrypoint] Cache ISR invalidé (Strapi joignable)"
      else
        echo "[entrypoint] Invalidation du cache impossible"
      fi
      return 0
    fi
    i=$((i + 1))
    sleep 5
  done
  echo "[entrypoint] Strapi injoignable : cache conservé"
}

warmup &
wait "$SERVER_PID"
