@echo off
setlocal
cd /d "%~dp0"

echo Starting Song Brocade iPad preview server...
echo.
echo Keep this window open while previewing on iPad.
echo If Windows asks for network permission, choose Allow.
echo.

where node >nul 2>nul
if %errorlevel%==0 (
  node local-server.mjs
  echo.
  echo Server stopped.
  pause
  exit /b
)

if exist "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" (
  "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" local-server.mjs
  echo.
  echo Server stopped.
  pause
  exit /b
)

where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8000 --bind 0.0.0.0
  echo.
  echo Server stopped.
  pause
  exit /b
)

where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 8000 --bind 0.0.0.0
  echo.
  echo Server stopped.
  pause
  exit /b
)

echo No local web runtime was found.
echo Please install Node.js or Python, then run this file again.
pause
