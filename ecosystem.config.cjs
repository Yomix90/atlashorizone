/**
 * Alternative à Docker : exécution avec PM2 sur le VPS (Node.js 22 + PostgreSQL installés sur l'hôte).
 *
 *   npm --prefix backend ci && npm --prefix backend run build
 *   npm --prefix frontend ci && npm --prefix frontend run build   (Strapi doit déjà tourner)
 *   pm2 start ecosystem.config.cjs && pm2 save && pm2 startup
 *
 * Configuration : backend/.env (lu par Strapi) et frontend/.env.production
 * (lu par Next.js au build pour les NEXT_PUBLIC_*, et ici au démarrage via --env-file).
 * Nginx de l'hôte : ./deploy/scripts/render-host-nginx.sh
 */
module.exports = {
  apps: [
    {
      name: 'atlas-strapi',
      cwd: './backend',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '1337',
      },
      max_memory_restart: '1G',
      time: true,
    },
    {
      name: 'atlas-frontend',
      cwd: './frontend/.next/standalone',
      script: 'server.js',
      node_args: '--env-file=../../.env.production',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: '3000',
      },
      max_memory_restart: '768M',
      time: true,
    },
  ],
};
