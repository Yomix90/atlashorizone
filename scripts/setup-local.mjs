#!/usr/bin/env node
/**
 * Prépare l'environnement de développement local (utilisé par demarrer.bat, fonctionne aussi sous macOS/Linux) :
 *  - backend/.env       : créé depuis .env.example avec des secrets aléatoires et SQLite (aucune base à installer) ;
 *  - frontend/.env.local : créé depuis .env.example, token Strapi et secret de revalidation synchronisés.
 * Les fichiers existants ne sont jamais écrasés ; seules les valeurs partagées du front sont réalignées.
 */
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const backendEnv = join(root, 'backend', '.env');
const frontendEnv = join(root, 'frontend', '.env.local');

const hex = (bytes = 32) => randomBytes(bytes).toString('hex');

function setVar(content, key, value) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, 'm');
  return re.test(content) ? content.replace(re, line) : `${content.trimEnd()}\n${line}\n`;
}

function readVar(content, key) {
  return content.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1]?.trim() ?? '';
}

// ─── backend/.env ────────────────────────────────────────
if (!existsSync(backendEnv)) {
  let env = readFileSync(join(root, 'backend', '.env.example'), 'utf8');
  env = setVar(env, 'APP_KEYS', [hex(16), hex(16), hex(16), hex(16)].join(','));
  for (const key of ['API_TOKEN_SALT', 'ADMIN_JWT_SECRET', 'TRANSFER_TOKEN_SALT', 'JWT_SECRET', 'ENCRYPTION_KEY']) {
    env = setVar(env, key, hex());
  }
  env = setVar(env, 'FRONTEND_API_TOKEN', hex(48));
  env = setVar(env, 'REVALIDATE_SECRET', hex(24));
  env = setVar(env, 'DATABASE_CLIENT', 'sqlite');
  env = setVar(env, 'DATABASE_FILENAME', '.tmp/data.db');
  writeFileSync(backendEnv, env);
  console.log('[setup] backend/.env créé (SQLite, secrets aléatoires)');
} else {
  console.log('[setup] backend/.env existe déjà');
}

const backend = readFileSync(backendEnv, 'utf8');
const token = readVar(backend, 'FRONTEND_API_TOKEN');
const revalidateSecret = readVar(backend, 'REVALIDATE_SECRET');

// ─── frontend/.env.local ─────────────────────────────────
const created = !existsSync(frontendEnv);
let front = created ? readFileSync(join(root, 'frontend', '.env.example'), 'utf8') : readFileSync(frontendEnv, 'utf8');
const before = front;
front = setVar(front, 'STRAPI_API_TOKEN', token);
front = setVar(front, 'REVALIDATE_SECRET', revalidateSecret);
if (created) {
  // En local, Strapi sert les images depuis localhost : autoriser l'optimiseur d'images
  front = setVar(front, 'IMAGES_ALLOW_LOCAL_IP', 'true');
}
if (front !== before || created) {
  writeFileSync(frontendEnv, front);
  console.log(`[setup] frontend/.env.local ${created ? 'créé' : 'mis à jour (token synchronisé avec Strapi)'}`);
} else {
  console.log('[setup] frontend/.env.local déjà à jour');
}
