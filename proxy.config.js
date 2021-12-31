const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://187.10.96.58:888',
      secure : false,
      logLevel : 'debug',
    }
  ];
  module.exports = PROXY_CONFIG;
