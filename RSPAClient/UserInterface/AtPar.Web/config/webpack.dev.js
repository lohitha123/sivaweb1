var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
   // devtool: '#source-map',
    devtool: 'cheap-module-source-map',
    output: {
        path: helpers.root('build'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'

    },

    plugins: [
      new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        //stats: 'minimal',
     

        contentBase: './',
        //headers: {
        //    'Access-Control-Allow-Origin': 'http://localhost:8080',
        //    'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
        //    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
        //    'Access-Control-Allow-Credentials': 'true'
        //},
        inline: true,
     
         port: 8080,
        // contentBase: '.\\src\\'
      //  contentBase: path.join(__dirname, "src"),

        // headers: { "Access-Control-Allow-Origin": "*" }
    }
});