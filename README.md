# Vue speed learning course

总结一下自己学习的vue知识，希望可以帮助到别人，同时，如果有一些错误的地方，希望可以得到指正，可以提issue，或者发邮件 imhwyer@163.com。希望可以多交流前端的知识，共同进步

在接下来的学习中，会长期的进行补充更新...

> 学习内容目录：

> 1，基础语法篇

> 2，简单对比vue1.x和vue2.x的一些改变

> 3，vue路由的学习 vue-router

> 4，状态管理器vuex

> 5，用vue全家桶开发完整项目

-------------------------------------------------------------------------------

* 如果你是vue的初学者，可以先看[基础篇](https://github.com/sprout-echo/vue-course/blob/master/vue-base/vue-base.md)

* 看完基础篇之后，可以动手写个小demo，很常见的一个表单的增删查改 [vue-curd](https://github.com/sprout-echo/vue-course/blob/master/vue-curd/vue-curd.md)

* 单页面应用，常用router来实现，[路由教程](https://github.com/sprout-echo/vue-course/blob/master/vue-router/vue-router.md)，这个教程是帮助你快速上手vue-router的使用。更细节的部分，还是看[vue-router文档](https://router.vuejs.org/)

* 状态管理 [vuex教程](https://github.com/sprout-echo/vue-course/tree/master/vuex/vuex.md)，这篇文章主要还是看了[官方文档](https://vuex.vuejs.org/zh-cn/installation.html)，再加入自己的一些理解，进行总结的。对于一些简单的应用，没有必要使用vuex，会使代码臃肿。

下一篇文章我们会详细介绍用vue全家桶（vue+vuex+webpack）完成一个完整项目的开发

对于webpack的学习，我在之前学习react的时候，看官网的时候，总结了一个[webpack配置](https://github.com/sprout-echo/vue-course/tree/master/webpack/webpack.md)，涉及到一些常用的插件，更多的我还不是很熟练

当然 vue提供了一个很方便的脚手架 vue-cli,可以帮助我们快速搭建环境和开发。
```
npm install -g vue-cli
```
使用这种方式比较慢，我们常用cnpm淘宝镜像来安装
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
如果安装失败，可以使用 npm cache clean 清理缓存，然后再重新安装。
然后使用 cnpm 安装 
```
cnpm install -g vue-cli
```
然后使用vue-cli初始化项目
```
vue init webpack project-name
```
这里的project-name就是你项目的文件夹名称

-------------------------------------------------------------------------
最后

> 如果你觉得我写的教程对你有所帮助的话，拜托请给个star ★
