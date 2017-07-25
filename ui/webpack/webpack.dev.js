const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack configuration Dev
 *
 */
module.exports = function (options) {

    console.log('Loaded Webpack DEVELOP configuration');
    options.environment = 'development';

    return webpackMerge({
        devtool: 'cheap-module-source-map',
        output: {
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id].chunk.js'
        },
        module: {

            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        'awesome-typescript-loader',
                        'angular2-template-loader',
                        'angular-router-loader'
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                }
            ]
        },
        stats: 'verbose'
    }, commonConfig(options));
};
