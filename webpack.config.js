const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const DEV_PORT = process.env.DEV_PORT || 1337;

module.exports = {
   devServer: {
      compress: true,
      port: DEV_PORT,
      quiet: true
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            resolve: {
               extensions: ['.js', '.jsx']
            },
            use: {
               loader: 'babel-loader',
               options: {
                  babelrc: true,
                  plugins: [
                     '@babel/plugin-proposal-object-rest-spread',
                     '@babel/plugin-transform-react-constant-elements',
                     '@babel/plugin-proposal-class-properties',
                     'react-hot-loader/babel' // disables itself in prod
                  ]
               }
            }
         },
         {
            test: /\.html$/,
            use: [
               {
                  loader: 'html-loader',
                  options: { minimize: true }
               }
            ]
         },
         {
            test: /(\.css|\.scss|\.sass)$/,
            use: [
               {
                  loader: 'style-loader'
               },
               {
                  loader: 'css-loader'
               },
               {
                  loader: 'sass-loader'
               }
            ]
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: './src/index.html',
         filename: './index.html'
      }),
      new FriendlyErrorsWebpackPlugin({
         compilationSuccessInfo: {
            messages: [
               `React Dev Server is running here: http://localhost:${DEV_PORT}`
            ]
         }
      })
   ]
};
