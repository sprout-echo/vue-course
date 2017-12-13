var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var rootPath = path.resolve(__dirname);
var src = path.join(rootPath, 'src');
var dist = path.join(rootPath, 'dist');

module.exports = {
	devtool:"source-map",
	entry: path.join(src, 'entry'),
    output: {
        path:dist, //打包后的文件存放的地方
        publicPath:'/',
    },
    resolve:{
    	extensions: [".js", ".json", ".jsx", ".css"]
    },
    module:{
    	rules:[
    	{
    		test: /\.(png|jpe?g|gif|svg)$/,
	        include: src,
	        exclude: /(node_modules)/,
	        use: [{
	            loader: 'url-loader',
	            options: {
		            limit: 10240, // 10KB 以下使用 base64
		            name: 'img/[name]-[hash:6].[ext]'
	         	}
	        }]
    	},{
    		test: /\.(js|jsx)$/,
	        include: src,
	        exclude: /(node_modules)/,
	        use: [{
	            loader: "babel-loader"
	        }]
    	},{

            test: /\.js$/,
            use: ['babel-loader'],
            include: src,
            
    	},{
    		test: /\.(woff2?|eot|ttf|otf)$/,
	        include:src,
	        exclude: /(node_modules)/,
	        use: [{
	            loader: 'url-loader',
	            options: {
		            limit: 10240, // 10KB 以下使用 base64
		            name: 'fonts/[name]-[hash:6].[ext]'
	            }
	        }]
    	}]
    },
    plugins:[
    	new webpack.NoEmitOnErrorsPlugin(),
    	new HtmlWebpackPlugin({
	        filename: 'index.html',
	        template: path.join(src, 'index.html'),
	        chunksSortMode: 'none'
	    })
    ]
}
