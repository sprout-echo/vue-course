# vue-curd
### 对vue1.x vue2.x实现简单的数据表格的增删查改，总结不同版本的区别点
1，在组件模板中，不支持片段代码
  `<blockquote>`
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
  `<blockquote>` 
