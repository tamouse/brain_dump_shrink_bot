// Configuration items

var baseConfig = {
  env: process.env.NODE_ENV || 'development',
  app_title: 'BrainDump/ShrinkBot',
  logging: false,
  db: {
    url: ''
  },
  services: {
    giphy: {
      url: 'http://api.giphy.com/v1/gifs/search',
      api_key: 'dc6zaTOxFJmzC'
    }
  }
};

var envConfig = require('./' + baseConfig.env);

module.exports = Object.assign({}, baseConfig, envConfig);
