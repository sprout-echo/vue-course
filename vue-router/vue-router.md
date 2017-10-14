# 路由篇 vue-router

用vue-router来实现一个单页面应用，先要下载vue-router.js，然后用script标签引入```<script src="vue-router.js"></script>```
```javascript
<div id="app">
    <div>
        <router-link to='/home'>首页</router-link>
        <router-link to="/list">列表</router-link>
    </div>
    <div>
        <router-view></router-view>
    </div>
</div>
<script>
    var Home = {
        template:'<h2>我是主页的内容</h2>'
    };
    var List = {
        template:'<h2>我是文章列表</h2>'
    };

    var Ufound = {
        template:'<h2>404</h2>'
    }

    new Vue({
        el:'#app',
        data:{},
        router:new VueRouter({
            routes:[
                {path:'/',component:Home},  //router-link to跳转的地址，显示对应的组件
                {path:"/home",component:Home},
                {path:"/list",component:List},
                {path:"*",component:Ufound}   //其他情况，显示404，未找到
            ]
        })
    })

</script>
```
```<router-link to="">```会被vue识别，自动显示成a标签 router-view是显示模板内容的区域

**二级路由**

二级路由使用children来配置，内部配置和一级路由一样，tab切换当前选项标签会自动添加router-link-active类，只需要设置该类的样式，就可以实现当前选中样式
```javascript
<style>
    .router-link-active{
        color: #c33;
    }
</style>
<meta charset="utf-8">
<div id="app">
    <div>
        <router-link to='/home'>首页</router-link>
        <router-link to="/list">列表</router-link>
        <router-link to="/user">用户</router-link>
    </div>
    <div>
        <router-view></router-view>
    </div>
</div>
<template id="user-tpl">
    <div>
        <div>
            <router-link to="/user/ming">小茗</router-link>
            <router-link to="/user/hong">小洪</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
var Home = {
    template:'<h2>我是主页的内容</h2>'
};
var List = {
    template:'<h2>我是文章列表</h2>'
};

var Ufound = {
    template:'<h2>404</h2>'
};

var User = {
    template:'#user-tpl'
};

var ming = {
    template:'<p>Hello, 我是小茗同学</p>'
};

var hong = {
    template:'<p>Hi,我是小洪，洪是洪水的洪</p>'
}

new Vue({
    el:'#app',
    data:{},
    router:new VueRouter({
        routes:[
            {path:'/',component:Home},  //router-link to跳转的地址，显示对应的组件
            {path:"/home",component:Home},
            {path:"/list",component:List},
            {path:'/user',component:User,children:[
                {path:'ming',component:ming},
                {path:'hong',component:hong}
            ]},
            {path:"*",component:Ufound}   //其他情况，显示404，未找到
        ]
    })
})

</script>
```
![demo](./img/vue2-1.png)

**url参数传递**

在配置路由的时候，路径前面加：,就表示此路径为参数

```
children:[
    {path:':age/ming/:sex',component:ming}
]
```
然后在模板中使用$router.params去访问这个值
```
var ming = {
    template:"<p>Hello,我是小茗，我今年 {{$router.params.age}}岁，我的性别是 {{$router.params.sex}}</p>"
}
```
页面template中传值
```
<router-link to="/user/18/ming/男">小茗</router-link>
```
