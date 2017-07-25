const helpers      = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpack      = require('webpack');

/**
 * Webpack Plugins
 */
const WebpackMd5Hash    = require('webpack-md5-hash');

/**
 * Webpack configuration - Prod
 *
 */
module.exports = function (options) {

    console.log('Loaded Webpack PRODUCTION configuration');
    options.environment = 'production';

    return webpackMerge({
        devtool: 'source-map',
        output: {

            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].bundle.map',
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
        plugins: [

            new WebpackMd5Hash(),

            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                beautify: false,
                output: {
                    comments: false
                },
                mangle: {
                    screw_ie8: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    drop_console: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false
                }
            }),
            new webpack.NoEmitOnErrorsPlugin()

        ],
        performance: {
            hints: "warning", // enum
            maxAssetSize: 200000, // int (in bytes),
            maxEntrypointSize: 400000, // int (in bytes)
            assetFilter: function (assetFilename) {
                // Function predicate that provides asset filenames
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        },
        stats: 'errors-only'
    }, commonConfig(options));
};
