@echo off
title RAFIF RXFIF STORE - Panel Admin (Port 3001)
echo ====================================================
echo    MENJALANKAN PANEL ADMIN KHUSUS
echo ====================================================
echo Panel Admin aktif di: http://localhost:3001
echo Login Default: admin / admin123
echo.
cd /d "%~dp0\admin"
npm run dev
pause
