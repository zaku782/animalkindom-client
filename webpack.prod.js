const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BabiliPlugin = require("babili-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new BabiliPlugin(),
            new OptimizeCSSPlugin({})
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                plugin: {
                    test: /[\\/]plugin[\\/]/,
                    priority: 0,
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
});