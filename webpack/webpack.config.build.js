var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var chalk = require('chalk');


var rootPath = path.resolve(__dirname);
var src = path.join(rootPath, 'src');

var config = require('./webpack.config.base');
config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';
config.performance = { hints: false };
config.module.rules.push(
{
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        }
      ]
    })
  }, {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'less-loader'
        }
      ]
    })
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader'
        }
      ]
    })
  }
)

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "commons",
    filename: "[name].[chunkhash:6].js",
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  new ExtractTextPlugin('[name].[contenthash:6].css')
)

module.exports = config;
