const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://187.57.135.122:888',
      secure : false,
      logLevel : 'debug',
    }
  ];
  module.exports = PROXY_CONFIG;
