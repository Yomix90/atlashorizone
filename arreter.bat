@echo off
rem Arrete Strapi (port 1337) et le site Next.js (port 3000) lances par demarrer.bat.
setlocal
chcp 65001 >nul
title Atlas Horizon - arret

echo Arret de Strapi et du site...
powershell -NoProfile -ExecutionPolicy Bypass -Command "foreach ($port in 1337, 3000) { Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue; Write-Host ('  port ' + $port + ' libere') } }"

rem Ferme les fenetres ouvertes par demarrer.bat
taskkill /fi "WINDOWTITLE eq Atlas - Strapi*" /t /f >nul 2>nul
taskkill /fi "WINDOWTITLE eq Atlas - Site*" /t /f >nul 2>nul

echo Termine.
ping -n 3 127.0.0.1 >nul
