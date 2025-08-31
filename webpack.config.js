const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// loader 的查找顺序和普通文件的查找顺序是一样的
//  配置自定义loader有以下几种方式
// 1 配置绝对路径
// 2 配置 resolveLoader 中的 alias
// 3 如果loader很多,用alias 一个一个配置很麻烦, 
//      resolveLoader.modules指定一个目录,找loader时候会先去找个目录下查找

module.exports = {
    mode: "development",
    devtool: false,
    // entry: "./src/index.js",
    entry: "./src/style-loader-entry/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    resolveLoader: {
        // alias: {
        //     'babel-loader': path.resolve(__dirname, 'loaders/babel-loader.js')  // 方式二
        // },
        // 先去loaders文件下找, 找不到则去node_modules下找
        modules: [path.resolve('loaders'), 'node_modules']   // 方式三
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'less-loader'
                ]
                // css-loader 是来处理 import 和 url
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // use: {
                //     // loader: 'babel-loader',  // 原生loader
                //     // loader: 'babel-loader',  // 方式二 
                //     loader: 'babel-loader',  // 方式三
                //     // loader: path.resolve(__dirname, 'loaders/babel-loader.js'),  // 方式一
                //     options: {
                //         // es6 -> es5
                //         presets: ['@babel/preset-env']
                //     }
                // }

                use: [
                    {
                        // loader: 'babel-loader',  // 原生loader
                        // loader: 'babel-loader',  // 方式二 
                        loader: 'babel-loader1',  // 方式三
                        // loader: path.resolve(__dirname, 'loaders/babel-loader.js'),  // 方式一
                        options: {
                            // es6 -> es5
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        // loader: 'babel-loader',  // 原生loader
                        // loader: 'babel-loader',  // 方式二 
                        loader: 'babel-loader2',  // 方式三
                        // loader: path.resolve(__dirname, 'loaders/babel-loader.js'),  // 方式一
                        options: {
                            // es6 -> es5
                            presets: ['@babel/preset-env']
                        }
                    },

                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};


/**
 * 要想在项目中使用自定义loader
 * 1.可以使用绝对路径 path.resolve(__dirname,'loader/babel-loader.js')
 * 2.resolveLoader 配置alias
 * 3.resolveLoader 配置modules
 */