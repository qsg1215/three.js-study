const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');


// 压缩抽取css
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


//压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');



const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    //热更新
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {  // 抽离自己写的公共代码
                    chunks: "initial",
                    name: "common", // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                },
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                styles: {
                    name: 'style',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            },
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,

        },
        minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                },
                chunkFilter: (chunk) => {
                    // Exclude uglification for the `vendor` chunk
                    if (chunk.name === 'vendor') {
                        return false;
                    }

                    return true;
                }
            },
        }),],

    },

    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        // new MiniCssExtractPlugin({
        //     filename: devMode ? 'styles/[name].css' : 'styles/[name].[hash].css',
        //     chunkFilename: devMode ? 'styles/[id].css' : 'styles/[id].[hash].css',
        // }),

        //提取css
        new MiniCssExtractPlugin({
            filename: devMode ? 'styles/[name].css ' : 'styles/[name].cssstyles/[name].[contenthash].css',
            chunkFilename: devMode ? 'styles/[id].css' : 'styles/[id].[contenthash].css',
        }),
        //压缩css
        devMode ? function () { } : new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),

        //压缩js
        devMode ? function () { } : new UglifyJsPlugin({
            sourceMap: true,
            cache: true,
            uglifyOptions: {
                compress: {
                    drop_console: true,//console
                    pure_funcs: ['console.log']//移除console
                }
            },
        })
    ],
    module: { //要打包的第三方模块
        rules: [
            { test: /\.(js|jsx)$/, use: [{ loader: 'babel-loader' }], exclude: /node_modules/ },

            {
                test: /\.(le|c)ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader, options: {
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                    }
                },
                    'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')({
                                'overrideBrowserslist.': ['> 1%', 'last 2 versions']
                            }),
                        ]
                    }
                },
                    'less-loader',]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};