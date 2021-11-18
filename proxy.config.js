const PROXY_CONFIG = [
    {
      context: '/api',
      target: 'http://201.95.197.175:888',
      secure : false,
      logLevel : 'debug',
     // pathRenwrite: {'^/api' : ''}
    }
  ];
  module.exports = PROXY_CONFIG;