// Configuration items

var baseConfig = {
    env: process.env.NODE_ENV || 'development',
    app_title: 'BrainDump/ShrinkBot',
    logging: false,
    db: {
        url: ''
    }
};

var envConfig = require('./' + baseConfig.env);

module.exports = Object.assign({}, baseConfig, envConfig);
