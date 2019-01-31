/*eslint-disable */
global.Promise = require('bluebird'); // for node 0.10

var path                 = require('path');

var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var AssetsPlugin      = require('assets-webpack-plugin');

var buildHash = process.env.NODE_ENV === "production" ? "[hash]" : "dev";

module.exports = {
    mode: 'production',
    entry: "./client/app.js",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
            }
        }),
        new MiniCssExtractPlugin("[name].css"),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en|uk|tr/),
        new AssetsPlugin({path: path.join(__dirname, 'etc')})
    ],
    output: {
        path: path.join(__dirname, "/public/static/build/", buildHash),
        filename: "main.js",
        publicPath: "static/build/" + buildHash + "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        // publicPath: '../'
                      }
                    },
                    "css-loader",
                    // "autoprefixer-loader"
                  ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        // publicPath: '../'
                      }
                    },
                    "css-loader",
                    // "autoprefixer-loader",
                    "less-loader"
                  ]
            },

            { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.svg/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
            { test: /\.(woff|woff2|ttf|eot)/, loader: "url-loader?limit=1" },

            { test: /\.jsx$/, loader: "babel-loader", exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: "babel-loader", exclude: [/node_modules/, /public/] },
            // { test: /\.json$/, loader: "json-loader" },

            { test: /\.txt$/, loader: "raw-loader" }
        ]
    }
    // ,
    // eslint: {
    //     configFile: '.eslintrc'
    // }
};
