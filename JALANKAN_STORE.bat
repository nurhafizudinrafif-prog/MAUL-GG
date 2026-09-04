@echo off
title RAFIF RXFIF STORE - Website Pembeli (Port 3000)
echo ====================================================
echo    MENJALANKAN WEBSITE PEMBELI (RAFIF STORE)
echo ====================================================
echo Website Pembeli aktif di: http://localhost:3000
echo.
cd /d "%~dp0\store"
npm run dev
pause
