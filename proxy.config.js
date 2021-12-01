const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://177.170.43.1:888',
      secure : false,
      logLevel : 'debug',
    }
  ];
  module.exports = PROXY_CONFIG;
