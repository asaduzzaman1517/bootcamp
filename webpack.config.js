const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|svg|jpeg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                            publicPath: 'img'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                            publicPath: '../fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: 'all',
                    test: /node_modules/,
                    name: 'vendor'
                }
            }
        }
    }
};