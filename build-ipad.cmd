@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel%==0 (
  node build-ipad.mjs
  echo.
  echo Output folder:
  echo %CD%
  echo.
  echo iPad file:
  echo %CD%\SongBrocade-iPad-offline.html
  echo.
  pause
  exit /b
)

if exist "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" (
  "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" build-ipad.mjs
  echo.
  echo Output folder:
  echo %CD%
  echo.
  echo iPad file:
  echo %CD%\SongBrocade-iPad-offline.html
  echo.
  pause
  exit /b
)

echo Node.js was not found. Install Node.js or use Codex bundled Node.
pause
