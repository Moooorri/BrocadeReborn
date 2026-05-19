@echo off
setlocal
echo Use one of these IPv4 addresses on your iPad:
echo.
ipconfig | findstr /R /C:"IPv4"
echo.
echo Usually the correct address looks like 192.168.x.x or 10.x.x.x.
echo Open this on iPad Safari:
echo.
echo http://YOUR_IPV4_ADDRESS:8000/
echo.
pause
