const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://201.95.70.49:888',
      secure : false,
      logLevel : 'debug',
    }
  ];
  module.exports = PROXY_CONFIG;
