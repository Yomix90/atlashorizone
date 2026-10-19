#!/usr/bin/env bash
# Restauration d'une sauvegarde créée par backup.sh.
#   ./deploy/scripts/restore.sh backups/db-20261019-031500.dump [backups/uploads-20261019-031500.tar.gz]
# ⚠ Remplace le contenu actuel de la base (et des médias si l'archive est fournie).
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; . ./.env; set +a

DB_DUMP="${1:?Chemin du fichier db-*.dump requis}"
UPLOADS="${2:-}"

read -r -p "Restaurer $DB_DUMP et écraser la base « $POSTGRES_DB » ? (oui/non) " answer
[ "$answer" = "oui" ] || { echo "Annulé."; exit 1; }

echo "→ Arrêt de Strapi et du front"
docker compose stop frontend strapi

echo "→ Restauration de la base"
docker compose exec -T postgres pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists --no-owner < "$DB_DUMP"

if [ -n "$UPLOADS" ]; then
  echo "→ Restauration des médias"
  docker compose run --rm --no-deps -T --entrypoint sh strapi -c \
    "rm -rf /opt/app/public/uploads/* && tar xzf - -C /opt/app/public" < "$UPLOADS"
fi

echo "→ Redémarrage"
docker compose up -d strapi frontend
echo "✔ Restauration terminée"
