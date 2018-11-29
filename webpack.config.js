const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, './app/index.js'),
        plugin: path.resolve(__dirname, './app/plugin.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: 'http://10.4.20.252:8888/',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: ['url-loader?limit=1&name=images/[hash:8].[name].[ext]']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1&minimize=true',
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1&minimize=true',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.min.js',
            'svg': 'svg.js/dist/svg.min.js',
        }
    },
    devServer: {
        port: 8888,
        disableHostCheck: true
    },
    optimization: {
        minimizer: [
            new BabiliPlugin(),
            new OptimizeCSSPlugin({})
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].style.[contenthash:12].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'app/index.html'),
            inject: true
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery/dist/jquery.min.js',
            $: 'jquery/dist/jquery.min.js'
        })
    ]
};
