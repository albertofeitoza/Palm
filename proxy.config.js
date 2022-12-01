const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://189.46.213.160:888',
      secure : false,
      logLevel : 'debug',
    }
  ];
  module.exports = PROXY_CONFIG;
