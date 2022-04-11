const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://177.115.9.143:888',
      secure : false,
      logLevel : 'debug',
    }
  ];
  module.exports = PROXY_CONFIG;
