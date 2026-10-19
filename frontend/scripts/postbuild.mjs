#!/usr/bin/env node
/**
 * Après `next build` : complète la sortie « standalone » avec les fichiers statiques
 * (.next/static) et le dossier public, pour qu'elle soit autonome (Docker et PM2).
 */
import { cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const standalone = join(root, '.next', 'standalone');

if (!existsSync(standalone)) {
  console.log('[postbuild] Pas de sortie standalone, rien à faire.');
  process.exit(0);
}

cpSync(join(root, '.next', 'static'), join(standalone, '.next', 'static'), { recursive: true });
if (existsSync(join(root, 'public'))) cpSync(join(root, 'public'), join(standalone, 'public'), { recursive: true });
console.log('[postbuild] .next/static et public copiés dans .next/standalone');
