#!/usr/bin/env node
/**
 * Vérifie que chaque fichier de traduction contient exactement les clés de messages/fr.json
 * (référence) et que les variables ICU {…} sont identiques. Code de sortie 1 en cas d'écart.
 *   npm run check:messages
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'messages');
const reference = 'fr.json';

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) => (v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, String(v)]]));

// Variables de premier niveau : {name} ou {count, plural, …}
const variables = (text) => {
  const vars = new Set();
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      if (depth === 0) {
        const m = /^\{\s*([a-zA-Z0-9_]+)/.exec(text.slice(i));
        if (m) vars.add(m[1]);
      }
      depth++;
    } else if (text[i] === '}') depth--;
  }
  return [...vars].sort().join(',');
};

const ref = new Map(flatten(JSON.parse(readFileSync(join(dir, reference), 'utf8'))));
let failed = false;

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== reference)) {
  const messages = new Map(flatten(JSON.parse(readFileSync(join(dir, file), 'utf8'))));
  const missing = [...ref.keys()].filter((k) => !messages.has(k));
  const extra = [...messages.keys()].filter((k) => !ref.has(k));
  const badVars = [...ref.keys()].filter((k) => messages.has(k) && variables(ref.get(k)) !== variables(messages.get(k)));

  if (missing.length || extra.length || badVars.length) failed = true;
  console.log(`${file}: ${messages.size}/${ref.size} clés${missing.length ? `, ${missing.length} manquante(s)` : ''}${extra.length ? `, ${extra.length} en trop` : ''}${badVars.length ? `, ${badVars.length} variable(s) différente(s)` : ''}`);
  for (const k of missing) console.log(`  - manquante : ${k}`);
  for (const k of extra) console.log(`  + en trop   : ${k}`);
  for (const k of badVars) console.log(`  ~ variables : ${k}`);
}

// ─── Syntaxe ICU : chaque message doit se compiler et se formater dans sa langue ───
// Valeurs numériques variées pour couvrir toutes les catégories de pluriel (l'arabe en a six).
const NUMERIC = new Set(['count', 'adults', 'children', 'nights', 'rating', 'step', 'total', 'page', 'index', 'year', 'day']);
const SAMPLES = [0, 1, 2, 3, 11, 100];
let IntlMessageFormat;
try {
  ({ IntlMessageFormat } = await import('intl-messageformat'));
} catch {
  console.log('(intl-messageformat introuvable : vérification ICU ignorée)');
}

if (IntlMessageFormat) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const locale = file.replace('.json', '');
    const errors = [];
    for (const [key, text] of flatten(JSON.parse(readFileSync(join(dir, file), 'utf8')))) {
      try {
        const mf = new IntlMessageFormat(text, locale);
        const names = variables(text).split(',').filter(Boolean);
        for (const n of SAMPLES) {
          const values = Object.fromEntries(names.map((v) => [v, NUMERIC.has(v) ? n : `«${v}»`]));
          // Balises riches (<terms>…</terms>) rendues en texte simple
          for (const tag of text.matchAll(/<(\w+)>/g)) values[tag[1]] = (chunks) => chunks.join('');
          const out = mf.format(values);
          const rendered = Array.isArray(out) ? out.join('') : String(out);
          if (/\{|\}/.test(rendered)) throw new Error(`accolade non résolue pour ${n}`);
        }
      } catch (error) {
        errors.push(`${key} : ${error.message}`);
      }
    }
    if (errors.length) failed = true;
    console.log(`${file}: ICU ${errors.length ? `${errors.length} erreur(s)` : 'OK'}`);
    for (const e of errors) console.log(`  ! ${e}`);
  }
}

process.exit(failed ? 1 : 0);
