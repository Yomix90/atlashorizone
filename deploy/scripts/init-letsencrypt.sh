#!/usr/bin/env bash
# Obtention initiale du certificat HTTPS Let's Encrypt (à lancer une fois, après deploy.sh).
# Prérequis : DNS de SITE_DOMAIN, www.SITE_DOMAIN et CMS_DOMAIN pointant vers ce serveur, ports 80/443 ouverts.
#   STAGING=1 ./deploy/scripts/init-letsencrypt.sh   → certificat de test (pas de limite de quota)
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; . ./.env; set +a

CERT=/etc/letsencrypt/live/agency
DOMAINS=(-d "$SITE_DOMAIN" -d "www.$SITE_DOMAIN" -d "$CMS_DOMAIN")
STAGING_ARG=""
[ "${STAGING:-0}" = "1" ] && STAGING_ARG="--staging"

echo "→ Certificat temporaire (pour démarrer Nginx)"
docker compose run --rm --no-deps --entrypoint sh certbot -c "
  mkdir -p $CERT &&
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 -subj '/CN=localhost' \
    -keyout $CERT/privkey.pem -out $CERT/fullchain.pem"

echo "→ Démarrage de Nginx"
docker compose up -d nginx

echo "→ Suppression du certificat temporaire"
docker compose run --rm --no-deps --entrypoint sh certbot -c "
  rm -rf /etc/letsencrypt/live/agency /etc/letsencrypt/archive/agency /etc/letsencrypt/renewal/agency.conf"

echo "→ Demande du certificat Let's Encrypt pour ${SITE_DOMAIN}, www.${SITE_DOMAIN}, ${CMS_DOMAIN}"
docker compose run --rm --no-deps --entrypoint certbot certbot certonly \
  --webroot -w /var/www/certbot \
  --cert-name agency $STAGING_ARG \
  --email "$LETSENCRYPT_EMAIL" --agree-tos --no-eff-email \
  --rsa-key-size 4096 "${DOMAINS[@]}"

echo "→ Rechargement de Nginx et démarrage du renouvellement automatique"
docker compose exec nginx nginx -s reload
docker compose up -d certbot

echo "✔ HTTPS actif : https://${SITE_DOMAIN}"
