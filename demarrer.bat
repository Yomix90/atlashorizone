@echo off
rem ============================================================
rem  Atlas Horizon - lancement local sous Windows (double-clic)
rem  1. installe les dependances si besoin
rem  2. prepare backend\.env et frontend\.env.local
rem  3. charge les contenus de demonstration au premier lancement
rem  4. demarre Strapi puis le site, et ouvre le navigateur
rem ============================================================
setlocal EnableExtensions
chcp 65001 >nul
title Atlas Horizon - demarrage
cd /d "%~dp0"

echo.
echo  ==============================================
echo     Atlas Horizon - lancement en local
echo  ==============================================
echo.

rem --- Prerequis ---------------------------------------------
where node >nul 2>nul
if errorlevel 1 (
  echo [ERREUR] Node.js n'est pas installe.
  echo          Installez la version LTS depuis https://nodejs.org puis relancez ce fichier.
  goto :fail
)
for /f "tokens=1 delims=." %%v in ('node -p "process.versions.node"') do set "NODE_MAJOR=%%v"
if %NODE_MAJOR% LSS 20 (
  echo [ERREUR] Node.js 20 ou plus est requis. Version installee : %NODE_MAJOR%.
  goto :fail
)
where curl >nul 2>nul
if errorlevel 1 (
  echo [ERREUR] curl est introuvable. Il est inclus dans Windows 10 et 11 : mettez Windows a jour.
  goto :fail
)

rem --- 1. Dependances ----------------------------------------
if not exist "backend\node_modules" (
  echo [1/5] Installation des dependances du backend - quelques minutes...
  call npm --prefix backend install --no-audit --no-fund
  if errorlevel 1 goto :fail
) else (
  echo [1/5] Dependances du backend : OK
)
if not exist "frontend\node_modules" (
  echo [2/5] Installation des dependances du site...
  call npm --prefix frontend install --no-audit --no-fund
  if errorlevel 1 goto :fail
) else (
  echo [2/5] Dependances du site : OK
)

rem --- 2. Fichiers d'environnement ---------------------------
echo [3/5] Preparation de la configuration locale...
node scripts\setup-local.mjs
if errorlevel 1 goto :fail

rem --- 3. Contenus de demonstration (premier lancement, SQLite) ---
findstr /b /c:"DATABASE_CLIENT=sqlite" "backend\.env" >nul 2>nul
if not errorlevel 1 if not exist "backend\.tmp\data.db" (
  echo [4/5] Premier lancement : chargement des 12 destinations de demonstration...
  call npm --prefix backend run seed
  if errorlevel 1 goto :fail
)

rem --- 4. Strapi ---------------------------------------------
curl -s -o nul -m 2 http://localhost:1337/_health
if not errorlevel 1 (
  echo [4/5] Strapi tourne deja sur le port 1337
) else (
  echo [4/5] Demarrage de Strapi - fenetre "Atlas - Strapi"...
  start "Atlas - Strapi" /D "%~dp0backend" cmd /k npm run develop
)

set /a TRIES=0
:wait_strapi
curl -s -o nul -m 2 http://localhost:1337/_health
if not errorlevel 1 goto :strapi_ready
set /a TRIES+=1
if %TRIES% GEQ 120 (
  echo [ERREUR] Strapi ne repond pas apres 4 minutes. Regardez la fenetre "Atlas - Strapi".
  goto :fail
)
ping -n 3 127.0.0.1 >nul
goto :wait_strapi
:strapi_ready
echo        Strapi est pret : http://localhost:1337/admin

rem --- 5. Site Next.js --------------------------------------
curl -s -o nul -m 2 http://localhost:3000/robots.txt
if not errorlevel 1 (
  echo [5/5] Le site tourne deja sur le port 3000
) else (
  echo [5/5] Demarrage du site - fenetre "Atlas - Site"...
  start "Atlas - Site" /D "%~dp0frontend" cmd /k npm run dev
)

set /a TRIES=0
:wait_site
curl -s -o nul -m 5 http://localhost:3000/robots.txt
if not errorlevel 1 goto :site_ready
set /a TRIES+=1
if %TRIES% GEQ 90 (
  echo [ERREUR] Le site ne repond pas apres 3 minutes. Regardez la fenetre "Atlas - Site".
  goto :fail
)
ping -n 3 127.0.0.1 >nul
goto :wait_site
:site_ready

start "" http://localhost:3000/fr
start "" http://localhost:1337/admin

echo.
echo  ==============================================
echo   Tout est lance !
echo.
echo   Site public    : http://localhost:3000
echo   Administration : http://localhost:1337/admin
echo.
echo   Premier lancement : creez votre compte
echo   administrateur dans la page qui s'ouvre.
echo.
echo   Pour tout arreter : arreter.bat
echo   ou fermez les fenetres "Atlas - Strapi" et "Atlas - Site".
echo  ==============================================
echo.
pause
exit /b 0

:fail
echo.
echo  Le demarrage a echoue. Lisez le message ci-dessus.
echo.
pause
exit /b 1
