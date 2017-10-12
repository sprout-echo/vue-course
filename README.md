# vue-curd
### 对vue1.x vue2.x实现简单的数据表格的增删查改，总结不同版本的区别点
1，在组件模板中，vue2.x不支持片段代码
```javascript
  之前:
     <template>
         <h3>我是组件</h3><strong>我是加粗标签</strong>
     </template>
 现在:  必须有根元素，包裹住所有的代码
     <template id="aaa">
             <div>
                 <h3>我是组件</h3>
                 <strong>我是加粗标签</strong>
             </div>
     </template>
     <script>
         Vue.component('aaa',{
            template:'#aaa'
        });
     </script>
 ```
2,vue1.x系统自带过滤器,比如{{msg|json}} {{msg|filterBy searchQuery}}等
vue2.x提供了一个filter处理器
```javascript
new Vue({
  //...
  filter:{
    filterFun:function(val){
      switch(val){
        case 1:return
      }
    }
  }
})

<span>{{msg|filterFun}}</span>
```
3，关于组件间通信 vue2.x废弃了$loadcast,$dispatch，events，官方推荐使用vuex或者全局的事件驱动

父组件可以通过props将数据赋给子组件  可以用async实现双向绑定
   vm.$emit('funcName',data)
   vm.$on('funcName',function(data){})

父子组件之间的访问：
* 父访问子： 使用$children  或  $refs
* 子访问父： $parent
* 子访问跟： $root

4,vue2.x废弃了ready钩子函数，但同时增加了beforeMount,mounted,updated等钩子函数

5,v-for语法迭代 vue2.x丢弃了 $index,$key
  
  新的语法： （item,index）in arr

6,vue1.x中可以使用 body元素作为挂载点，但是在vue2.x中，如果使用body或者html作为挂载点，会有以下告警：
  ```
  Do not mount Vue to <html> or <body> - mount to normal elements instead.
  ```
  
