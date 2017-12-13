# webpack篇

简单的webpack配置是比较容易配置的，但是webpack提供了很多插件的使用，功能非常的强大，对于各种详细的配置我还不熟练，以下是阅读[webpack官方文档](https://webpack.github.io/docs/)的
时候写的一个配置 webpack.config.js,相关的一些解释都在注释中

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    //更容易追踪错误和警告，将编译后的代码映射回原始源代码
    devtool:'inline-source-map',
    entry:{
        app:'./src/index.js',
        // print:'./src/print.js'
    },
    //外部扩展  这些库不会和你的代码一起打包
    externals:['react','react-dom'],
    plugins:[
        //每次构建前，会清理/dist文件夹
        new CleanWebpackplugin(['dist']),
        //它会用新生成的index.html,把我们原来的替换,所有的bundle会自动添加到html中
        new HtmlWebpackPlugin({
            title:'Output Management'
        }),
        //使用模块热替换，它允许在运行时更新各种模块，而无需进行完全刷新，主要是更新 webpack-dev-server的配置，需要删掉print.js的入口起点，因为它现在正被index.js模式使用
        //也可以通过命令修改webpack-dev-server的配置  webpack-dev-server --hotOnly
        new webpack.HotModuleReplacementPlugin(),
        //精简输出 ，删除未引用代码的压缩工具
        //也可以在命令行接口中 使用  --optimize-minimize标记来使用UglifyJSPlugin
        new UglifyJSPlugin({
            //webpack2.x默认是false
            sourceMap:true
        }),
        //代码分离 防止重复 使用CommonsChunkPlugin去重和分离chunk  输出文件中会有一个common.bundle.js文件，从app.bundle.js文件中删除了重复的代码
        //CommonsChunkPlugin插件将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用，浏览器会在缓存中提取公共代码，而不是每次访问一个页面时，再去加载文件 index.html用script标签引入时，公共代码要加载在入口代码之前
        new webpack.optimize.CommonsChunkPlugin({
            name:'common'
        }),
        //ExtractTextPlugin需要版本2才能在webpack2.x中使用
        new ExtractTextPlugin("style.css"),
        //自动加载模块，而不用到处 import或require
        //ProvidePlugin可以将模块作为一个变量，被webpack在其他每个模块中引用,我们在模块中便可以使用 $('#item')
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        })
    ],
    //最后在dist文件夹中输出是 print.bundle.js   app.bundle.js
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
        // publicPath:'/'
    },
    //webpack观察者模式 webpack --watch 会自动重新编译修改后的模块，但不会自动刷新浏览器
    //此配置告知 webpack-dev-server 在localhost:8080下建立服务，将dist目录下的文件，作为可访问的文件    执行 webpack-dev-server --open 会看到浏览器自动加载页面，web服务器会自动重新加载编译后的代码
    devServer:{
        contentBase:'./dist',
        hot:true
    },
    //管理资源
    module:{
        rules:[
            {
                //css的模块热替换，借助于 style-loader
                test:/\.css$/,
                //use:['style-loader','css-loader']
                //ExtractTextPlugin会把所有入口chunk中引用的*.css，移动到独立分离的css文件，这样，样式将不再内嵌到JS bundle中，如果样式文件较大，这样会更快提前加载
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader',
                    publicPath:"/dist"
                })
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:['file-loader']
                //当你 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，并且 MyImage 变量将包含该图像在处理后的最终 url。当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。html-loader 以相同的方式处理 <img src="./my-image.png" />。
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:['file-loader']
            },
            {
                test:/\.xml$/,
                use:['xml-loader']
            }
        ]
    },
    //webpack2.x不再需要传入一个空字符串
    resolve:{
        //自动解析确定的扩展 能够使用户在引入模块时不带扩展
        extensions:[".js",".jsx",'.json'],
        //创建 import 或 require 的别名，来确保模块引入变得更简单
        //本来是：import Utility from '../../utilities/utility';
        //现在可以：import Utility from 'Utilities/utility';
        alias:{
            Utilities: path.resolve(__dirname, 'src/utilities/')
        }
    }
}

```
在实际开发中，我们会针对对个开发环境，配置多个webpack配置文件,以下链接是我平时开发react时配置的文件，可作为参考：

* ![webpack.config.base.js](https://github.com/sprout-echo/vue-course/blob/master/webpack/webpack.config.base.js)    配置一些开发，生产环境公共的部分
* ![webpack.config.dev.js](https://github.com/sprout-echo/vue-course/blob/master/webpack/webpack.config.dev.js)     开发环境，主要是搭建一个开发时的服务器，可以配置devServer,然后利用 webpack-dev-server
* ![webpack.config.build.js](https://github.com/sprout-echo/vue-course/blob/master/webpack/webpack.config.build.js)   生产环境，主要是将文件进行压缩打包等

但是，其实vue提供了一个非常方便的脚手架 vue-cli,可以帮助我们快速搭建环境开发，我们可以用vue-cli生成项目，然后打开webpack的文件，看一下相关的配置
