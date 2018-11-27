const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin"); //基于babel的js压缩工具

module.exports = {
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
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [path.resolve(__dirname, 'node_modules')],
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: ['url-loader?limit=1&name=images/[hash:8].[name].[ext]', 'image-webpack-loader']
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?importLoaders=1&minimize=true', 'postcss-loader']
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?importLoaders=1&minimize=true', 'postcss-loader', 'sass-loader']
            })
        }]
    },
    resolve: {
        extensions: [".js", ".css", ".scss", ".vue"],
        alias: {
            'vue': 'vue/dist/vue.min.js',
            'jquery': "jquery/dist/jquery.min.js",
            'svg': "svg.js/dist/svg.min.js"
        }
    },
    devServer: {
        colors: true,
        inline: true,
        port: 8888,
        disableHostCheck: true
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'app/index.html'),
            inject: true
        }), new webpack.ProvidePlugin({
            jQuery: "jquery/dist/jquery.min.js",
            $: "jquery/dist/jquery.min.js",
            Chart: "chart.js/dist/Chart.min.js"
        }), new ExtractTextPlugin({
            filename: 'style.[contenthash].css'
        }), new webpack.optimize.CommonsChunkPlugin({
            name: 'npm',
            minChunks: function (module) {
                return (module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, './node_modules')) === 0)
            }
        }), new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }), new BabiliPlugin(), new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};
