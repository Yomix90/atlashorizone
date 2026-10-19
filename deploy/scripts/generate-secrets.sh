#!/usr/bin/env bash
# Crée .env (à partir de .env.example) et remplace chaque valeur « changeMe » par un secret aléatoire.
# Les valeurs déjà personnalisées ne sont jamais écrasées.
set -euo pipefail
cd "$(dirname "$0")/../.."

[ -f .env ] || { cp .env.example .env; echo "→ .env créé depuis .env.example"; }

rand() { openssl rand -hex "${1:-32}"; }

set_if_placeholder() {
  local key="$1" value="$2"
  if grep -qE "^${key}=changeMe" .env; then
    sed -i.bak "s|^${key}=.*|${key}=${value}|" .env && rm -f .env.bak
    echo "  ✔ ${key}"
  fi
}

echo "Génération des secrets :"
set_if_placeholder POSTGRES_PASSWORD "$(rand 24)"
set_if_placeholder APP_KEYS "$(rand 16),$(rand 16),$(rand 16),$(rand 16)"
set_if_placeholder API_TOKEN_SALT "$(rand)"
set_if_placeholder ADMIN_JWT_SECRET "$(rand)"
set_if_placeholder TRANSFER_TOKEN_SALT "$(rand)"
set_if_placeholder JWT_SECRET "$(rand)"
set_if_placeholder ENCRYPTION_KEY "$(rand)"
set_if_placeholder FRONTEND_API_TOKEN "$(rand 48)"
set_if_placeholder REVALIDATE_SECRET "$(rand 24)"

chmod 600 .env
echo "Terminé. Complétez maintenant les domaines, le SMTP et Turnstile dans .env."
