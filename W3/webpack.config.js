const path = require('path');
const { webpack } = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    mode: 'development',
    devtool: 'eval', //μλΉμ€μ hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    entry: {
        app: './client',

    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env',{
                        targets: {
                            browsers:['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react'
                ],
                plugins: [
                    'react-refresh/babel',
                ],
            }

        }],
    },
    plugins: [
        new LoaderOptionsPlugin({ debug : true }),
        new RefreshWebpackPlugin()
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, "dist"),
        publicPath: '/dist/',
    },
    devServer: {
        static: {
            publicPath: '/dist/',
        },
        hot: true,
    },

};