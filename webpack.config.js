const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const config = require('./config.json');

module.exports = (env, options) => ({
    entry: './src/js/remote.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: 'remote.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            __HOST__: `'${config.host}'`,
            __PORT__: config.port
        }),
        new CopyWebpackPlugin([{
            from: './src/css/',
            to: '../css/'
        },
        {
            from: './src/images/',
            to: '../images/'
        },
        {
            from: './src/data/',
            to: '../data/'
        }]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../remote.html',
            minify: {
                collapseWhitespace: true,
                html5: true,
                keepClosingSlash: false,
                preserveLineBreaks: false,
                removeComments: true,
                removeRedundantAttributes: true
            }
        })
    ]

});
