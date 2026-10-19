# Atlas Horizons Voyages — site d'agence de tourisme au Maroc

Site multilingue (FR, EN, ES, DE, AR en RTL) pour présenter des circuits au Maroc, recevoir des
**demandes de réservation**, des messages de contact et des demandes de **circuits sur mesure**.

> « Atlas Horizons Voyages », les coordonnées, adresses, licences et textes juridiques sont des
> **valeurs d'exemple**. Remplacez-les dans l'admin Strapi (*Paramètres du site*, *Pages statiques*)
> et dans `.env`.

| Partie | Technologie |
|---|---|
| `frontend/` | Next.js 16 (App Router, TypeScript), Tailwind CSS 4, next-intl 4, react-hook-form + zod, Leaflet/OpenStreetMap, Motion |
| `backend/` | Strapi 5.58 (TypeScript), PostgreSQL 17 (SQLite possible en local), i18n, Nodemailer |
| `deploy/` | Docker Compose, Nginx, Let's Encrypt, scripts de déploiement / sauvegarde, variante PM2 |

---

## Sommaire

1. [Architecture](#1-architecture)
2. [Arborescence](#2-arborescence)
3. [Installation locale](#3-installation-locale)
4. [Administration (Strapi)](#4-administration-strapi)
5. [Langues et traductions](#5-langues-et-traductions)
6. [Déploiement Docker sur VPS](#6-déploiement-docker-sur-vps) · [avec Dokploy](#6-bis-déploiement-avec-dokploy)
7. [Variante PM2 (sans Docker)](#7-variante-pm2-sans-docker)
8. [Mises à jour](#8-mises-à-jour)
9. [Sauvegardes et restauration](#9-sauvegardes-et-restauration)
10. [Médias : disque, Cloudinary ou S3](#10-médias--disque-cloudinary-ou-s3)
11. [Paiement en ligne (CMI / PayPal)](#11-paiement-en-ligne-cmi--paypal)
12. [Sécurité et RGPD](#12-sécurité-et-rgpd)
13. [Choix techniques](#13-choix-techniques)
14. [Dépannage](#14-dépannage)

---

## 1. Architecture

```
Navigateur ──HTTPS──▶ Nginx ──▶ Next.js (site public, SSR/ISR)  ──token serveur──▶ Strapi (API REST) ──▶ PostgreSQL
                         │            ▲  POST /api/revalidate (secret)                  │
                         └──▶ Strapi (admin + /uploads) ◀──────────────────────────────────┘
```

- **Le navigateur ne parle jamais à l'API d'écriture.** Les formulaires appellent des *Server Actions*
  Next.js qui limitent le débit, vérifient le pot de miel et Cloudflare Turnstile, valident avec zod,
  puis transmettent à Strapi avec un token d'API **côté serveur uniquement**.
- Strapi revalide tout côté serveur : référence unique, **prix recalculé** (le prix envoyé par le
  navigateur est ignoré), statut forcé à « en attente », champs inconnus rejetés.
- Les emails (confirmation client dans sa langue + notification agence) et l'invalidation du cache
  du site sont déclenchés par des **middlewares du Document Service** Strapi (équivalent Strapi 5 des
  lifecycle hooks). Ils s'appliquent aussi aux contenus saisis dans l'admin.
- Le site est pré-généré (**ISR**) : 60 fiches destinations (12 × 5 langues) + pages statiques.
  Chaque publication dans Strapi invalide instantanément les pages concernées.

## 2. Arborescence

```
.
├── backend/                         Strapi 5
│   ├── config/                      serveur, base, CORS/CSP, plugins (upload, email), API
│   ├── src/
│   │   ├── api/                     destination, reservation, contact-message, review, faq, page, site-setting
│   │   │   └── */content-types/*/schema.json
│   │   ├── components/              shared (seo, list-item, social-link, opening-hour), destination, settings
│   │   ├── lib/                     tarifs, validation, référence, emails (5 langues), notes, ISR, export CSV
│   │   ├── admin/                   bouton « Exporter en CSV » dans la liste des réservations
│   │   └── index.ts                 bootstrap : locales, permissions publiques, token serveur
│   ├── scripts/seed.js              12 destinations, avis, FAQ, pages, paramètres (5 langues) + images
│   └── Dockerfile
├── frontend/                        Next.js 16
│   ├── messages/{fr,en,es,de,ar}.json
│   ├── scripts/                     check-messages.mjs (clés + ICU), postbuild.mjs (standalone)
│   ├── src/
│   │   ├── app/[locale]/            accueil, destinations, destinations/[slug], booking, contact,
│   │   │                            custom-tour, about, faq, terms, privacy, legal-notice, 404
│   │   ├── app/api/revalidate/      invalidation ISR appelée par Strapi
│   │   ├── app/sitemap.ts, robots.ts
│   │   ├── components/              layout, home, destinations, destination, forms, map, ui
│   │   ├── i18n/                    routage, navigation, chargement des messages (repli FR)
│   │   ├── lib/                     client Strapi typé, actions, schémas zod, SEO, sécurité, tarifs
│   │   └── proxy.ts                 détection de la langue + préfixe /fr, /en…
│   └── Dockerfile
├── deploy/
│   ├── nginx/templates/default.conf.template   reverse proxy, HTTPS, limitation de débit
│   ├── nginx/snippets/              ssl.conf, proxy.conf, security-headers.conf
│   └── scripts/                     generate-secrets, deploy, init-letsencrypt, backup, restore, render-host-nginx
├── docker-compose.yml               production (postgres, strapi, frontend, nginx, certbot)
├── docker-compose.dev.yml           PostgreSQL seul pour le développement
├── ecosystem.config.cjs             variante PM2
└── .env.example                     configuration de production (Docker)
```

## 3. Installation locale

Prérequis : **Node.js 20 à 24**, npm. PostgreSQL facultatif en local (SQLite fonctionne).

```bash
npm run install:all
```

### Backend (Strapi)

```bash
cp backend/.env.example backend/.env
```

Générez chaque secret de `backend/.env` (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`,
`TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, `FRONTEND_API_TOKEN`, `REVALIDATE_SECRET`) avec :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Base de données, au choix :
- **SQLite** (le plus simple) : `DATABASE_CLIENT=sqlite` et `DATABASE_FILENAME=.tmp/data.db` ;
- **PostgreSQL** : `docker compose -f docker-compose.dev.yml up -d`, puis `DATABASE_CLIENT=postgres`.

```bash
npm --prefix backend run seed
```

```bash
npm run dev:backend
```

Ouvrez http://localhost:1337/admin et créez le premier compte administrateur.

> Avec npm 11, les scripts d'installation des modules natifs sont autorisés explicitement dans
> `backend/package.json` (`allowScripts`) : esbuild, swc, better-sqlite3.

### Frontend (Next.js)

```bash
cp frontend/.env.example frontend/.env.local
```

Dans `frontend/.env.local` : `STRAPI_API_TOKEN` = la valeur de `FRONTEND_API_TOKEN` du backend,
`REVALIDATE_SECRET` = la même valeur que côté backend. Pour l'aperçu en mode production local,
`IMAGES_ALLOW_LOCAL_IP=true` (Next 16 bloque par défaut l'optimisation d'images servies par une IP locale).

```bash
npm run dev:frontend
```

Le site est sur http://localhost:3000 (redirection automatique vers `/fr`, `/en`… selon le navigateur).

### Commandes utiles

| Commande | Rôle |
|---|---|
| `npm --prefix backend run seed` | Ajoute les contenus de démonstration manquants (idempotent) |
| `npm --prefix backend run seed:force` | ⚠ Supprime puis recrée destinations, avis, FAQ, pages, paramètres |
| `npm --prefix backend run typecheck` | Vérification TypeScript du backend |
| `npm --prefix frontend run typecheck` | Vérification TypeScript, y compris les clés de traduction |
| `npm --prefix frontend run check:messages` | Parité des clés entre les 5 langues + syntaxe ICU |
| `npm --prefix frontend run build` | Build de production (Strapi doit tourner) |

## 4. Administration (Strapi)

Adresse : `https://cms.<votre-domaine>/admin` (en local : http://localhost:1337/admin).

**Rôles.** *Super Admin* (tout), *Editor* (tous les contenus, rôle recommandé pour l'équipe),
*Author* (ses propres contenus). Gérez-les dans *Paramètres → Administration Panel → Roles*.

**Contenus localisés** (sélecteur de langue en haut à droite de chaque fiche) :
- **Destination** : textes, programme jour par jour, inclus / non inclus, SEO… sont traduits.
  Le slug, les prix, la durée, la région, le type, les images et les coordonnées GPS sont **communs
  aux 5 langues** : modifiés une fois, ils s'appliquent partout.
- **Avis client** (publié = visible), **FAQ**, **Page statique** (`about`, `terms`, `privacy`, `legal-notice`).
- **Paramètres du site** : nom, téléphone, WhatsApp (chiffres seulement, ex. `212600000000`), emails,
  `notificationEmail` (destinataire des demandes, jamais exposé), horaires, réseaux sociaux,
  **tarifs des options** utilisés pour le calcul automatique du prix.

**Réservations.** Liste filtrable par statut. Ouvrez une demande pour la passer en *confirmed* ou
*cancelled* et ajouter des **notes internes** (champ privé, jamais renvoyé par l'API).
Le bouton **« Exporter en CSV »** télécharge les réservations (UTF-8, séparateur `;`, compatible Excel,
protégé contre l'injection de formules). Filtres possibles via l'URL :
`/reservation-export/csv?status=pending&from=2026-01-01&to=2026-12-31`.

**Messages de contact** : demandes générales et circuits sur mesure (détails structurés dans
`tripDetails`), case *handled* pour le suivi.

**Note moyenne** des destinations : recalculée automatiquement à chaque publication / dépublication d'avis.

**Emails automatiques** : à chaque nouvelle réservation ou message, le client reçoit une confirmation
dans sa langue, et l'agence une notification (langue : `AGENCY_EMAIL_LOCALE`) avec un lien vers l'admin.
Configurez le SMTP dans `.env`. Un échec d'envoi est journalisé sans bloquer l'enregistrement.

## 5. Langues et traductions

- **Interface** : `frontend/messages/*.json`. `fr.json` est la référence **typée** : une clé utilisée
  dans le code mais absente de `fr.json` provoque une erreur TypeScript. Une clé absente d'une autre
  langue retombe sur le français.
- `npm --prefix frontend run check:messages` vérifie la parité des clés, l'identité des variables
  `{…}` et compile chaque message ICU (pluriels arabes : zero, one, two, few, many, other).
- **Contenus** : saisis dans Strapi pour chaque langue. **Emails** : `backend/src/lib/email-messages.ts`.
- **Arabe** : `dir="rtl"` sur `<html>`, police Cairo, propriétés logiques Tailwind (`ms-`, `ps-`,
  `start-`, `end-`, `border-s`…) ; flèches et carrousels inversés (`rtl:rotate-180`).
- URLs : `/fr/destinations/merzouga`, `/ar/destinations/merzouga`… (slug commun), balises `hreflang`
  + `x-default` et `canonical` sur chaque page, sitemap multilingue.

**Ajouter une langue** (ex. italien) : locale dans `backend/src/lib/setup.ts` et `constants.ts`
(+ enum `customerLocale` / `guideLanguage` des schémas), textes d'email, `frontend/src/i18n/routing.ts`,
`messages/it.json`, puis traduire les contenus dans Strapi.

## 6. Déploiement Docker sur VPS

Prérequis : VPS Linux (2 vCPU / 4 Go de RAM conseillés), **Docker Engine + Docker Compose v2.24+**,
ports 80/443 ouverts. DNS (enregistrements A/AAAA) pour `SITE_DOMAIN`, `www.SITE_DOMAIN` et `CMS_DOMAIN`.

```bash
git clone <votre-dépôt> /opt/atlas-horizons
```

```bash
cd /opt/atlas-horizons && cp .env.example .env && ./deploy/scripts/generate-secrets.sh
```

Éditez `.env` : domaines, `LETSENCRYPT_EMAIL`, SMTP, clés Turnstile. Puis :

```bash
./deploy/scripts/deploy.sh --no-pull
```

Ce script démarre PostgreSQL et Strapi, attend qu'ils soient prêts, **construit le front pendant que
Strapi tourne** (les pages sont pré-générées avec les vrais contenus ; le token passe par un secret
BuildKit et n'est jamais écrit dans l'image), puis démarre Next.js. Ensuite, une seule fois :

```bash
./deploy/scripts/init-letsencrypt.sh
```

(`STAGING=1` pour un essai sans consommer le quota Let's Encrypt). Le renouvellement est automatique
(conteneur `certbot` toutes les 12 h, rechargement de Nginx toutes les 6 h).

Créez le premier administrateur sur `https://<CMS_DOMAIN>/admin`. Pour charger les contenus de démonstration :

```bash
docker compose exec strapi npm run seed
```

Enfin, remplacez les valeurs d'exemple dans *Paramètres du site* et les pages juridiques.

**Ce que fait la pile :** PostgreSQL (volume `pgdata`, non exposé), Strapi (volume `uploads`, port 1337
lié à 127.0.0.1 uniquement), Next.js (réseau interne), Nginx (HTTPS, HSTS, gzip, cache des fichiers
statiques, limitation de débit des POST et de la connexion admin, `X-Real-IP` pour l'anti-spam),
redirection `www` → domaine principal, `client_max_body_size` 30 Mo pour la médiathèque.

## 6 bis. Déploiement avec Dokploy

[Dokploy](https://dokploy.com) fournit Traefik : les domaines et le HTTPS Let's Encrypt se gèrent dans son
interface. On utilise donc **`docker-compose.dokploy.yml`** (PostgreSQL + Strapi + Next.js, sans Nginx ni
Certbot) au lieu de `docker-compose.yml`.

1. **DNS** : deux enregistrements A vers l'IP du serveur Dokploy : `SITE_DOMAIN` (et `www` si souhaité)
   et `CMS_DOMAIN` (ex. `cms.mon-agence.ma`).
2. **Créer l'application** : *Project → Create Service → Compose*, type **Docker Compose**.
   - *Provider* : GitHub, dépôt `Yomix90/atlashorizone`, branche `main`.
   - *Compose Path* : `./docker-compose.dokploy.yml`.
3. **Environment** : collez le contenu de [`deploy/dokploy/env.example`](deploy/dokploy/env.example) et
   remplissez-le. Générez chaque secret avec `openssl rand -hex 32` (pour `APP_KEYS`, quatre valeurs séparées
   par des virgules). Dokploy écrit ces valeurs dans un `.env` à côté du compose. Le fichier les transmet
   explicitement à chaque service.
4. **Domains** (onglet *Domains → Add Domain*) :

   | Service | Host | Port | HTTPS |
   |---|---|---|---|
   | `frontend` | `SITE_DOMAIN` | 3000 | Let's Encrypt |
   | `frontend` | `www.SITE_DOMAIN` (facultatif) | 3000 | Let's Encrypt |
   | `strapi` | `CMS_DOMAIN` | 1337 | Let's Encrypt |

5. **Deploy**. Au premier déploiement, le front est construit avant que Strapi n'existe. Dès que Strapi
   répond, le conteneur Next.js invalide tout son cache ISR une fois (`frontend/docker-entrypoint.sh`), et
   les pages se remplissent sans redéploiement. Aux déploiements suivants, le build lit directement les
   contenus publiés via `https://CMS_DOMAIN`.
6. Créez le premier administrateur sur `https://CMS_DOMAIN/admin`. Pour les contenus de démonstration,
   ouvrez le terminal du service `strapi` dans Dokploy et lancez `npm run seed`.
7. **Déploiement automatique** : activez *Autodeploy* (webhook GitHub) pour redéployer à chaque push sur `main`.
8. **Sauvegardes** : les volumes nommés `pgdata` (base) et `uploads` (médias) sont compatibles avec les
   **Volume Backups** de Dokploy (destination S3 à configurer dans *Settings → Destinations*). Pour un
   dump SQL en plus, créez une tâche planifiée (*Schedules*) sur le service `postgres` :
   `pg_dump -U $POSTGRES_USER -d $POSTGRES_DB --format=custom > /var/lib/postgresql/data/backup.dump`.

Différences avec la pile Nginx :
- HTTPS et redirections sont gérés par Traefik ; HSTS et CSP restent envoyés par Next.js et Strapi.
- La limitation de débit des formulaires reste assurée par Next.js (IP lue dans `X-Real-IP`, fourni par Traefik).
- Les ports ne sont pas publiés (`expose`) : seul Traefik, via `dokploy-network`, atteint les conteneurs.

## 7. Variante PM2 (sans Docker)

Sur l'hôte : Node.js 22, PostgreSQL, Nginx, Certbot, `npm i -g pm2`.

1. `backend/.env` (PostgreSQL local, `NODE_ENV=production`, `PUBLIC_URL=https://cms.…`,
   `IS_PROXIED=true`, `FRONTEND_URL=http://127.0.0.1:3000`).
2. `frontend/.env.production` (mêmes variables que `frontend/.env.example`, avec les URL de production
   et `STRAPI_API_URL=http://127.0.0.1:1337`).
3. Build et lancement :

```bash
npm --prefix backend ci && npm --prefix backend run build
```

```bash
pm2 start ecosystem.config.cjs --only atlas-strapi
```

```bash
npm --prefix frontend ci && npm --prefix frontend run build
```

```bash
pm2 start ecosystem.config.cjs --only atlas-frontend && pm2 save && pm2 startup
```

4. Nginx et HTTPS :

```bash
sudo ./deploy/scripts/render-host-nginx.sh example-agence.ma cms.example-agence.ma
```

Le script indique ensuite la commande `certbot certonly --webroot …` à lancer, puis `nginx -t && systemctl reload nginx`.
Pour les sauvegardes sans Docker, utilisez `pg_dump` / `tar` directement (mêmes principes qu'au §9).

## 8. Mises à jour

```bash
./deploy/scripts/deploy.sh
```

Le script fait `git pull`, une **sauvegarde préventive**, reconstruit Strapi puis le front, redémarre
les services et invalide le cache ISR. Les migrations de schéma Strapi s'appliquent au démarrage.

- Mettre à jour Strapi : `npx @strapi/upgrade minor` dans `backend/`, tester en local, puis déployer.
- Mettre à jour Next.js et les dépendances : `npm outdated`, tester `npm run build`, puis déployer.
- Les contenus modifiés dans l'admin n'exigent **aucun** redéploiement (revalidation automatique).

## 9. Sauvegardes et restauration

```bash
./deploy/scripts/backup.sh
```

Crée `backups/db-AAAAMMJJ-HHMMSS.dump` (pg_dump compressé) et `uploads-….tar.gz` (médias), avec
rotation (`BACKUP_RETENTION_DAYS`, 14 jours par défaut) et copie distante optionnelle (`BACKUP_REMOTE`
pour rsync). Planification quotidienne (`crontab -e`) :

```
15 3 * * * /opt/atlas-horizons/deploy/scripts/backup.sh >> /var/log/atlas-backup.log 2>&1
```

Restauration (demande une confirmation, arrête Strapi et le front pendant l'opération) :

```bash
./deploy/scripts/restore.sh backups/db-20261019-031500.dump backups/uploads-20261019-031500.tar.gz
```

Testez une restauration au moins une fois par trimestre et conservez une copie hors du VPS.

## 10. Médias : disque, Cloudinary ou S3

Par défaut, les médias sont stockés sur le disque du VPS (volume Docker `uploads`), servis par
`https://<CMS_DOMAIN>/uploads/…` et optimisés par `next/image` (AVIF/WebP, lazy loading, tailles adaptées).

**Cloudinary :**

```bash
npm --prefix backend install @strapi/provider-upload-cloudinary@5.58.0
```

Puis dans `.env` : `UPLOAD_PROVIDER=cloudinary`, `CLOUDINARY_NAME/KEY/SECRET`,
`CSP_MEDIA_SOURCES=res.cloudinary.com` et `EXTRA_IMAGE_HOSTS=res.cloudinary.com`, et redéployez.

**S3 / compatible (Scaleway, OVH, Wasabi…)** : `@strapi/provider-upload-aws-s3@5.58.0`,
`UPLOAD_PROVIDER=aws-s3`, variables `S3_*`, et le domaine du bucket / CDN dans `CSP_MEDIA_SOURCES`
et `EXTRA_IMAGE_HOSTS`.

Les images de démonstration générées par le seed sont des illustrations provisoires : remplacez-les par
de vraies photos dans la médiathèque (1600 px de large minimum, texte alternatif renseigné).

## 11. Paiement en ligne (CMI / PayPal)

La version actuelle enregistre des **demandes de réservation** confirmées par l'agence. Stripe
n'étant pas disponible pour les comptes marocains, l'architecture prévoit **CMI** ou **PayPal** :

- champs déjà présents sur *Réservation* : `paymentStatus` (unpaid, pending, paid, refunded),
  `paymentProvider` (none, cmi, paypal), `paymentTransactionId` (privé) ;
- intégration conseillée : une Server Action Next.js crée la session de paiement (formulaire signé
  CMI ou commande PayPal), puis une route Strapi **de rappel** (callback CMI / webhook PayPal) vérifie
  la signature côté serveur et met à jour `paymentStatus` ; le prix de référence reste `totalPrice`,
  calculé par Strapi ;
- ne jamais faire confiance au retour navigateur : seule la notification serveur signée fait foi.

## 12. Sécurité et RGPD

- Token Strapi uniquement côté serveur ; rôle public en **lecture seule** sur les contenus publiés
  (réappliqué à chaque démarrage, toute écriture publique ajoutée par erreur est retirée).
- Validation zod (client + Server Action) puis validation Strapi ; champs privés (`internalNotes`,
  `notificationEmail`, `paymentTransactionId`) jamais renvoyés par l'API.
- Anti-spam : pot de miel, Cloudflare Turnstile, limitation de débit (Next.js + Nginx).
- Contenu riche rendu sans HTML brut (moteur de blocs maison) ; JSON-LD échappé ; liens externes
  en `noopener`.
- En-têtes : CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` ;
  CORS Strapi restreint aux domaines du site.
- Secrets dans `.env` (permissions 600), jamais commités (`.gitignore`).
- RGPD : bandeau cookies (rien de non essentiel avant consentement ; Google Analytics optionnel et
  chargé seulement après acceptation, IP anonymisée), lien « Gérer les cookies » dans le pied de page
  pour retirer son consentement, politique de confidentialité (loi 09-08 / CNDP et RGPD).
- Sauvegardes PostgreSQL planifiées (§9).

## 13. Choix techniques

- **Next.js App Router + ISR** : pages servies statiquement (score Lighthouse élevé, SEO), mais
  rafraîchies dès qu'un contenu est publié grâce aux tags de cache invalidés par Strapi. Les filtres
  de la liste restent rendus côté serveur et partageables par URL.
- **Server Actions plutôt qu'une API publique** : aucun endpoint d'écriture exposé au navigateur,
  token et logique anti-spam centralisés côté serveur.
- **Strapi 5 + Document Service middlewares** : remplacent les lifecycle hooks (déconseillés en v5 avec
  le brouillon / publication) et s'exécutent après validation de la transaction. Les e-mails ne partent
  donc que pour des enregistrements réellement créés.
- **Slug et prix non localisés** : une destination = un document traduit en 5 langues ; prix et
  médias saisis une seule fois, `hreflang` direct entre langues.
- **Prix recalculé côté serveur** : même formule partagée (`backend/src/lib/pricing.ts` ↔
  `frontend/src/lib/pricing.ts`), affichage en direct côté client, valeur de référence côté Strapi.
- **Libellés Intl calculés côté serveur** (pays, langues) : l'ICU de Node et celui du navigateur
  diffèrent parfois, ce qui casserait l'hydratation.
- **next-intl** : routage `/fr`, `/en`…, détection `Accept-Language`, mémorisation dans le cookie
  `NEXT_LOCALE`, messages ICU typés.
- **Tailwind CSS 4 + propriétés logiques** : un seul code pour LTR et RTL.
- **Leaflet + OpenStreetMap** : pas de clé d'API, chargé uniquement côté client.
- **Docker Compose + Nginx + Certbot** : reproductible sur n'importe quel VPS ; PM2 documenté pour
  les hébergements sans Docker.

## 14. Dépannage

| Symptôme | Cause / solution |
|---|---|
| Images cassées en local (`400` sur `/_next/image`) | `IMAGES_ALLOW_LOCAL_IP=true` dans `frontend/.env.local`, puis rebuild |
| Accueil sans destinations après un build | Strapi n'était pas joignable pendant le build : relancer `deploy.sh` (ou attendre la revalidation, 1 h max) |
| `401` sur `/api/…` côté front | `STRAPI_API_TOKEN` (front) ≠ `FRONTEND_API_TOKEN` (Strapi), ou valeur < 32 caractères |
| Pas d'email reçu | Vérifier `SMTP_*` et `docker compose logs strapi \| grep email` ; `notificationEmail` dans Paramètres du site |
| Contenu modifié non visible | Vérifier `FRONTEND_URL` et `REVALIDATE_SECRET` identiques des deux côtés ; logs `[revalidate]` de Strapi |
| `429 Too Many Requests` | Limitation de débit Nginx / Next.js ; ajuster `limit_req_zone` dans le modèle Nginx |
| Nginx ne démarre pas | Certificat absent : lancer `init-letsencrypt.sh` ; vérifier le DNS |
| Erreur de build Strapi sous npm 11 | Autoriser les scripts natifs : `npm install-scripts approve esbuild @swc/core better-sqlite3` |
