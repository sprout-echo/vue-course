var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var config = require('./webpack.config.base');
config.performance = { hints: false };
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';
config.cache = true;

config.module.rules.push({
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      // options: {
      //   modules: true
      // }
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
}, {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
        // options: {
        //   modules: true
        // }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      },
      {
        loader: 'less-loader'
      }
    ]
  }, {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        // options: {
        //   modules: true
        // }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
 })

config.devServer = {
	clientLogLevel: "none",
	contentBase: path.join(__dirname, "build"),
	watchContentBase: true,//dist 改动重新加载
	historyApiFallback: true,
	compress: true,
	port: 8888,
	hot: true,
	inline: true,
	overlay: {
		warnings: false,
		errors: true
	},
	noInfo: false, //取消打包信息显示
	stats: {
		chunkModules: false,
		chunks: false,
		timmings: true,
		hash: false,
		version: false,
		cached: false
	},
	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 300,
		poll: 1000
	}
}
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
module.exports = config;
