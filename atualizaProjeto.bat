@echo off

for /f %%a in ('powershell Invoke-RestMethod https://ipinfo.io/ip') do set PublicIP=%%a

echo const PROXY_CONFIG = [> proxy.config_novoIP.js
echo     {>> proxy.config_novoIP.js
echo       context: '/api',>> proxy.config_novoIP.js
echo       target: 'http://%PublicIP%:888',>> proxy.config_novoIP.js
echo       secure : false,>> proxy.config_novoIP.js
echo       logLevel : 'debug',>> proxy.config_novoIP.js
echo     }>> proxy.config_novoIP.js
echo   ];>> proxy.config_novoIP.js
echo   module.exports = PROXY_CONFIG;>> proxy.config_novoIP.js
pause


