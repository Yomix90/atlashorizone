#!/usr/bin/env bash
# Variante sans Docker (PM2) : génère la configuration Nginx de l'hôte à partir du même modèle,
# avec Next.js et Strapi écoutant sur 127.0.0.1.
#   sudo ./deploy/scripts/render-host-nginx.sh example-agence.ma cms.example-agence.ma
set -euo pipefail
cd "$(dirname "$0")/../.."

SITE_DOMAIN="${1:?Domaine du site requis}"
CMS_DOMAIN="${2:?Domaine du CMS requis}"
export SITE_DOMAIN CMS_DOMAIN

install -d /etc/nginx/snippets /var/www/certbot
cp deploy/nginx/snippets/*.conf /etc/nginx/snippets/

envsubst '${SITE_DOMAIN} ${CMS_DOMAIN}' < deploy/nginx/templates/default.conf.template \
  | sed -e 's#server frontend:3000;#server 127.0.0.1:3000;#' -e 's#server strapi:1337;#server 127.0.0.1:1337;#' \
  > /etc/nginx/conf.d/atlas-horizons.conf

echo "✔ /etc/nginx/conf.d/atlas-horizons.conf généré."
echo "  Certificat : certbot certonly --webroot -w /var/www/certbot --cert-name agency -d $SITE_DOMAIN -d www.$SITE_DOMAIN -d $CMS_DOMAIN"
echo "  Puis : nginx -t && systemctl reload nginx"
