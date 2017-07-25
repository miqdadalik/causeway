const webpack    = require('webpack');
const helpers    = require('./helpers');

/*
 * Webpack Plugins
 */
const AssetsPlugin               = require('assets-webpack-plugin');
const CopyWebpackPlugin          = require('copy-webpack-plugin');
const HtmlWebpackPlugin          = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin         = require('clean-webpack-plugin');
const Package                    = require('../package.json');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function (options) {

    const config = require('../src/environment/env.' + options.server + '.json');
    console.log('Loaded ' + options.server + ' server settings');

    return {
        entry: {

            'polyfills': './src/polyfills.ts',
            'vendor': './src/vendor.ts',
            'main': './src/main.ts'
        },
        output: {
            path: helpers.root('dist'),
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss', '.css'],
            modules: [helpers.root('src'), helpers.root('node_modules')]

        },
        module: {

            rules: [
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: helpers.root('src', 'index.html')
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    loader: 'file-loader?name=assets/images/[name].[ext]'
                },
                {
                    test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)$/,
                    loader: 'file-loader?name=assets/fonts/[name].[ext]'
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.scss$/,
                    exclude: helpers.root('src'),
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    include: helpers.root('src'),
                    loaders: ['raw-loader', 'sass-loader', 'postcss-loader']
                }
            ],
            noParse: [/.+zone\.js\/dist\/.+/]
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: helpers.rootFolder
            }),
            new webpack.EnvironmentPlugin({
                'NODE_ENV': options.environment,
                'APP': config,
                'TITLE': options.metadata.title,
                'BUILD_TIME': new Date().toString(),
                'VERSION': Package.version
            }),
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['main', 'vendor', 'polyfills']
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/,
                helpers.root('src')
            ),
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets'}
            ]),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                options: {
                    htmlLoader: {
                        minimize: false
                    }
                }
            }),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency',
                metadata: options.metadata,
                inject: 'head'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                $: 'jquery',
                'window.$': 'jquery'
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new BrowserSyncPlugin({
                server: {
                    baseDir: ['dist']
                },
                port: 3000,
                host: 'localhost',
                open: false
            })
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};
