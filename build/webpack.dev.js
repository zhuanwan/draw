'use strict';
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    target: 'web',
    mode: 'development',
    output: {
        publicPath: '/',
    },
    devServer: {
        compress: false,
        port: 8081,
        hot: true,
        historyApiFallback: true,
    },
    stats: 'errors-only',
    devtool: 'eval-cheap-module-source-map',
};

module.exports = merge(config, baseConfig);
