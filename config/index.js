// Configuration items

var baseConfig = {
    env: process.env.NODE_ENV || 'development',
    logging: false,
    db: {
	url: ''
    }
};

var envConfig = require('./' + baseConfig.env);

module.exports = Object.assign({}, baseConfig, envConfig);
