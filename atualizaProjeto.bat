@echo off

for /f %%a in ('powershell Invoke-RestMethod https://ipinfo.io/ip') do set PublicIP=%%a

FIND /i "%PublicIP%" "proxy.config.js"

if NOT %ERRORLEVEL% EQU 0 ( 

git pull
  
echo const PROXY_CONFIG = [> proxy.config.js
echo     {>> proxy.config.js
echo       context: '/api',>> proxy.config.js
echo       target: 'http://%PublicIP%:888',>> proxy.config.js
echo       secure : false,>> proxy.config.js
echo       logLevel : 'debug',>> proxy.config.js
echo     }>> proxy.config.js
echo   ];>> proxy.config.js
echo   module.exports = PROXY_CONFIG;>> proxy.config.js

DEL atualizaProjeto.bat.bak
DEL proxy.config.js.bak

git add proxy.config.js
git commit -m "Atualização do IP Proxy"
git push origin master
  
)
