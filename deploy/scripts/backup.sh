#!/usr/bin/env bash
# Sauvegarde PostgreSQL (pg_dump) + médias (volume uploads), avec rotation.
# Planification quotidienne (crontab -e) :
#   15 3 * * * /opt/atlas-horizons/deploy/scripts/backup.sh >> /var/log/atlas-backup.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; . ./.env; set +a

BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION="${BACKUP_RETENTION_DAYS:-14}"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
umask 077

echo "[$(date -Is)] Sauvegarde ${STAMP}"

# 1) Base de données (format « custom » : compressé, restaurable table par table)
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom --no-owner \
  > "$BACKUP_DIR/db-$STAMP.dump"

# 2) Médias (inutile si UPLOAD_PROVIDER=cloudinary ou aws-s3)
if [ "${UPLOAD_PROVIDER:-local}" = "local" ]; then
  docker compose exec -T strapi tar czf - -C /opt/app/public uploads > "$BACKUP_DIR/uploads-$STAMP.tar.gz"
fi

# Vérification minimale : fichiers non vides
[ -s "$BACKUP_DIR/db-$STAMP.dump" ] || { echo "✗ Dump vide"; exit 1; }

# 3) Rotation
find "$BACKUP_DIR" -maxdepth 1 -type f \( -name 'db-*.dump' -o -name 'uploads-*.tar.gz' \) -mtime +"$RETENTION" -delete

# 4) Copie hors serveur (optionnelle) : définir BACKUP_REMOTE, ex. « user@backup-host:/srv/atlas »
if [ -n "${BACKUP_REMOTE:-}" ]; then
  rsync -az "$BACKUP_DIR"/ "$BACKUP_REMOTE"/
fi

echo "[$(date -Is)] ✔ Terminé ($(du -sh "$BACKUP_DIR" | cut -f1) au total)"
