'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const config = {
    mode: 'production',
    // devtool: 'eval-cheap-module-source-map',
    output: {
        clean: true,
        path: path.join(__dirname, '../dist'),
        filename: '[name]_[contenthash:8].js',
        publicPath: process.env.REACT_APP_RUNENV === 'prod' ? 'https://cdn.xxx.cn' : '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        // new BundleAnalyzerPlugin(),
        // gzip 打包
        new CompressionPlugin({
            test: /.(js|css)$/, // 只生成css,js压缩文件
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩格式,默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8, // 压缩率,默认值是 0.8
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                exclude: /\/node_modules\//,
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            minSize: 30, // 提取出的chunk的最小大小
            cacheGroups: {
                default: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2, // 模块被引用2次以上的才抽离
                    priority: -20,
                },
                vendors: {
                    // 拆分第三方库（通过npm|yarn安装的库）
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                },
                antd: {
                    name: 'antd',
                    chunks: 'all',
                    priority: 10,
                    test: /antd/,
                },
                react: {
                    name: 'react',
                    chunks: 'all',
                    priority: 11,
                    test: /react|react-dom|react-router-dom/,
                },
            },
        },
    },
};

module.exports = merge(config, baseConfig);
