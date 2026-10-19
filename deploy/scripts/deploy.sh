#!/usr/bin/env bash
# Déploiement / mise à jour en production (Docker Compose).
#   ./deploy/scripts/deploy.sh            → met à jour le code (git pull) puis reconstruit
#   ./deploy/scripts/deploy.sh --no-pull  → reconstruit sans git pull
#
# Ordre important : Strapi doit tourner AVANT le build du front, car Next.js pré-génère
# les pages (accueil, fiches destinations…) en interrogeant l'API pendant le build.
set -euo pipefail
cd "$(dirname "$0")/../.."

[ -f .env ] || { echo "✗ Fichier .env manquant (cp .env.example .env puis ./deploy/scripts/generate-secrets.sh)"; exit 1; }
set -a; . ./.env; set +a
export DOCKER_BUILDKIT=1

if [ "${1:-}" != "--no-pull" ] && [ -d .git ]; then
  echo "→ Récupération du code"
  git pull --ff-only
fi

echo "→ Sauvegarde préventive de la base (si elle tourne déjà)"
if docker compose ps --status running postgres | grep -q postgres; then
  ./deploy/scripts/backup.sh || echo "  (sauvegarde ignorée)"
fi

echo "→ Base de données et Strapi"
docker compose build strapi
docker compose up -d postgres strapi

echo "→ Attente de Strapi (healthcheck)"
for i in $(seq 1 60); do
  status=$(docker inspect -f '{{.State.Health.Status}}' "$(docker compose ps -q strapi)" 2>/dev/null || echo starting)
  [ "$status" = "healthy" ] && break
  sleep 5
done
[ "$status" = "healthy" ] || { echo "✗ Strapi ne répond pas : docker compose logs strapi"; exit 1; }

echo "→ Build du front (pages pré-générées depuis Strapi)"
docker compose build frontend
docker compose up -d frontend

if docker compose run --rm --no-deps --entrypoint test certbot -f /etc/letsencrypt/live/agency/fullchain.pem; then
  echo "→ Nginx et renouvellement HTTPS"
  docker compose up -d nginx certbot
  docker compose exec nginx nginx -s reload || true
else
  echo "⚠ Aucun certificat HTTPS : lancez ./deploy/scripts/init-letsencrypt.sh (premier déploiement)."
fi

echo "→ Invalidation du cache ISR"
docker compose exec -T frontend wget -qO- --header="x-revalidate-secret: ${REVALIDATE_SECRET}" \
  --header="Content-Type: application/json" \
  --post-data='{"tags":["destinations","reviews","faqs","pages","site-settings"]}' \
  http://127.0.0.1:3000/api/revalidate > /dev/null && echo "  ✔ cache invalidé" || echo "  (invalidation ignorée)"

echo "→ Nettoyage des images Docker inutilisées"
docker image prune -f > /dev/null

echo "✔ Déploiement terminé : https://${SITE_DOMAIN}  ·  admin : https://${CMS_DOMAIN}/admin"
