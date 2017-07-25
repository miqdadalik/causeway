module.exports = function (env) {
    var configuration;

    // Webpack execution variables
    var settings = {
        server: (env.server || 'dev'),
         metadata: {
            title: 'Causeway Assignment',
            baseUrl: '/',
            description: 'Causeway Dashboard'
         }
    };

    // Load dev or prod build settings
    switch (process.env.NODE_ENV) {
        case 'prod':
        case 'production':
            configuration = require('./webpack/webpack.prod')(settings);
            break;

        case 'dev':
        case 'development':
        default:
            configuration = require('./webpack/webpack.dev')(settings);
            break;
    }

    return configuration;

}
