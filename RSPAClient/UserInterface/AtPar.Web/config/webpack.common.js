var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',


    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [
          {
              test: /\.ts$/,
              loaders: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('src', 'tsconfig.json') }
                }, 'angular2-template-loader', 'angular2-router-loader'
              ]
          },


          //{
          //    test: /\.ts$/,
          //    loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          //    exclude: [/\.(spec|e2e)\.ts$/]
          //},

          //{
          //    test: /\.js$/,
          //    loader: "awesome-typescript-loader?doTypeCheck=false&useBabel=true&useWebpackText=true",
          //    include: /www\/app\//,
          //    exclude: /node_modules/
          //},

            //{
            //    test: /\.ts$/,
            //    loader: 'webpack-replace',
            //    query: {
            //        search: 'moduleId: module.id,',
            //        replace: ''
            //    }
            //},

            { test: /\.xml$/, loader: 'xml-loader' },

           {
               test: /\.html$/,
               loader: 'html-loader'
           },
          {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
              loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
          {
              test: /\.css$/,
              exclude: helpers.root('src', 'app'),
              loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
          },


          {
              test: /\.css$/,
              include: helpers.root('src', 'app'),
              loader: 'raw-loader'
          }

        ]
    },

    plugins: [

         new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
      ),



      new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
      }),

  new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }, { from: 'src/assets/Izenda', to: 'Izenda' }]),

      new HtmlWebpackPlugin({
          template: 'src/index.html',
          hash: true
      })
    ]

};