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
