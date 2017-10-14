# vue基础篇

### 1，数据绑定

**表单**

v-model会忽略所有表单元素的value,checked,selected特性的初始值，它会选择Vue实例数据来作为具体的值
```javascript
    <div id="app">
        <input type="text" v-model="msg"/>
        <textarea v-model="areaMsg"></textarea>
        <input type="checkbox" value="魁拔" v-model="checkedNames"/>
        <input type="checkbox" value="蛮吉" v-model="checkedNames"/>
        <input type="checkbox" value="蛮大人" v-model="checkedNames"/>
        <div>Checked names: {{checkedNames}}</div>
        <select v-model="selected">
            <option disabled value="">请选择</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <div>selected:{{selected}}</div>
    </div>
    <script src="vue.js"></script>
    <script>
        new Vue({
            el:"#app",
            data:{
                msg:"Hello World!",
                areaMsg:"多文本输入",
                checkedNames:[],
                selected:''
            }
        })
    </script>
```
![demo1](./img/vue1-1.png)

**条件渲染**
```javascript
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>NOT A|B</div>

new Vue({
    //...
    data:{
        type:'C'
    }
})
```
v-else 元素必须紧跟在 v-if 或者 v-else-if 元素的后面——否则它将不会被识别。
可以用```<div v-if="true">显示</div>```来控制dom元素的显示和隐藏
相同的条件指令还有 v-show  ```<div v-show="true">显示</div>```

这两者的区别是 v-if是动态的向DOM树添加，删除DOM元素 v-show是通过设置DOM元素的display样式来控制显示和隐藏。一般来说，v-if有更高的切换开销，而v-show有更高的初始渲染开销，如果要频繁切换的话，选择v-show比较好

**属性绑定**

可以用v-bind来绑定，```<div v-bind:class="isActive"></div>``` v-bind也可以省略，简写 ```<div :class="isActive"></div>``` 可以直接绑定style样式属性 ```<div :style="{color:#fff}"></div>```

```<img :src="picurl"/>```

上面的isActive和picurl都是变量值，要在实例的data中定义

**遍历数据**

v-for循环显示json数据或数组
```javascript
<div id="app">
    <div v-for="(item,index) in arr">{{index}}:{{item}}</div>
    <div v-for="(item,key,index) in jsons">{{index}}:{{key}}:{{item}}</div>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            arr:['pig','dog','cat'],
            jsons:{
                name:'小茗',
                age:'3',
                sex:'男'
            }
        }
    })
</script>
```
**VUE实例的声明周期**
```javascript
<div id="container"><button @click="updateDatd">{{test}}</button></div>
<script>
new Vue({
    el:'#container',
    data:{
        test:'Hi vue'
    },
    beforeCreate:function(){
        console.log(this)
        showData('创建vue实例前',this)
    },
    created:function(){
        showData('创建vue实例后',this)
    },
    beforeMount:function(){
        showData('挂载到dom前',this)
    },
    mounted:function(){
        showData('挂载到dom后',this)
    },
    beforeUpdate:function(){
        showData('数据变化更新前',this)
    },
    updated:function(){
        showData('数据变化更新后',this)
    },
    destroyed:function(){
        showData('vue实例销毁后',this)
    },
    methods:{
        updateDatd:function(){
            this.test = 'update data'
        }
    }
});
function showData(process,obj){
    console.log(process);
    console.log('data数据：'+obj.test);
    console.log('挂载的对象：');
    console.log(obj.$el);
    console.log('-----------------------');
}
</script>
```
![demo4](./img/vue1-4.png)
### 2,指令

**绑定事件**

可以用v-on监听DOM事件来触发一些js代码，如：
```
<button v-on:click="counter +=1">{{counter}}</button>
new Vue({
    //...
    data:{
        counter:0
    }
})
```

对于复杂一些的js逻辑代码，可以用v-on绑定一个方法名，如：
```
<button v-on:greet>Greet</button>    
new Vue({
    //...
    data:{
        name:'VUE'
    },
    methods:{
        greet:function(){
            alert('Hello '+this.name)
        }
    }
})
```
绑定事件的简写方式 @click="greet",还有很多的修饰符，比如键值修饰符 .enter .tab .delete .esc等，鼠标修饰符 .left  .right  .middle

**显示html标签内容**

就是js的innerHTML()的作用，在vue中用v-html实现，v-text就相当于innerText()



**自定义指令**

Vue.directive()定义全局指令，然后再标签中使用 v-指令 调用
```javascript
<div v-test-red>红色的字</div>
<div v-test-two="{'color':'#ff0'}">黄色的字</div>
Vue.directive('testRed',function(el){
    //el就是页面的dom 如果testRed用驼峰命名的话，页面标签使用要用横线连接
    el.style.color = '#c33'
});
//也可以从页面传参
Vue.directive('test-two',function(el,args){
    el.style.color = args.value.color
});
```

可以在实例中定义局部指令 directives
```
new Vue({
    //...
    directives:{
        'test-red':function(el){
            //...
        }
    }
});
```
### 3，组件

组件可以扩展 HTML 元素，封装可重用的代码。

**全局注册**
```javascript
<my-component></my-component>
Vue.component('my-component',{
    template:'<div>A custom component</div>',
    //组件里data必须是个函数，而且返回的是个对象
    data:function(){
        return {

        }
    }
})
```
使用DOM作为模板时，会收到html本身的一些限制，因为Vue只有在浏览器里解析，规范化模板之后才能获取其内容，尤其是像```<ul> <ol> <table> <select>```这样的元素允许包含的元素有限制，如：
```
<table>
    <my-row></my-row>  //my-row会被当做无效的内容
</table>
```
解决方案，用is特性
```
<table>
    <tr is="my-row"></tr>
</table>
```

**局部注册**
```javascript
var Child = {
    template:'<div>A custom component</div>'
}
new Vue({
    //...
    components:{
        //<my-component> 将只在父组件模板中可用
        'my-component':Child
    }
})
```

**模板独立编写**

有时候模板的html代码有很多，字符串的形式写在js里不好写，可以将它独立写在html中，使用template标签定义模板，将内容写在模板内，给模板指定一个id
```javascript
<div>
    <my-temp></my-temp>
</div>
<template id="temp">
    <div>
        <p @click="change">{{msg}}</p>
    </div>
</template>
<script>
    Vue.component('my-temp',{
        template:'#temp',
        data:function(){
            return{
                msg:'呵呵哒'
            }
        },
        methods:{
            change:function(){
                this.msg = '厉害了'
            }
        }
    })
</script>
```

### 4,组件嵌套，通信

**组件嵌套**

在组件中使用components定义子组件
```
Vue.component('my-component',{
    template:'#parent-gl'
    //...
    components:{
        'child-component':{
            template:'#child-gl'
        }
    }
})
```
```
new Vue({
    //...
    components:{
        //上面的实例也可以看做是它的父组件
        'child-component':{
            //...
            components:{
                'grandchild-component':{
                    //...
                }
            }
        }
    }
    })
```
**父子组件之间通信**

使用v-bind：传递数据，使用props接收数据,如下：
```javascript
<div id="app">
    <parent-cop></parent-cop>
</div>
<template id="temp-tpl">
    <div>
        <h2>我是：{{msg}} | 子集显示 -> {{msg2.text}}</h2>
        <!--子组件调用，并传递父组件的值-->
        <child-cop :ms1="msg1" :ms2="msg2"></child-cop>
    </div>
</template>
<script>
    new Vue({
        el:'#app',
        components:{
            'parent-cop':{
                template:'#temp-tpl',
                data:function(){
                    return{
                        msg:'父组件',
                        msg1:'父集的共享数据1'
                        msg2:{
                            text:'父集的共享数据2',
                            style:{
                                height:'100px',
                                background:'#c33'
                            }
                        }
                    }
                },
                methods:{
                    test:function(){
                        alert('父组件的方法已经调用')
                    }
                },
                components:{
                    'child-cop':{
                        props:['ms1','ms2'],  //在组件里用props接收数据
                        template:"<div><h3 @click='showMsg'>我是子组件，我使用的父集数据 -> {{ms1}}::{{ms2.text}}</h3></div>",
                        methods:{
                            showMsg:function(){
                                this.ms2.text = '父组件的值被子组件修改了';
                                //用$parent访问父组件，this.$aprent是一个数组，包含所有子组件实例也可以用在父组件中用$children访问子组件
                                this.$parent.test();  
                            }
                        }
                    }
                }
            }
        }
    })
</script>
```
![demo3](./img/vue1-3.png)
除了上面提到的，还可以用$refs来访问子组件。在子组件上用v-ref指令，给子组件一个索引ID，在父组件中，通过this.$refs.索引ID访问子组件的实例

可以为组件的prop指定验证规则，如果传入的数据不符合要求，vue会发出警告，要用对象的形式来定义prop，不能用字符串数组
```
Vue.component('example',{
    props:{
        msg1:Number,
        msg2:[String,Number],
        msg3:{
            type:String,
            required:true,
            default:'Hello'
            //默认值是一个数组或对象时要用一个工厂函数返回
            default:function(){
                return ['lily','tony','Hebe']
            }
        },
        msg4:{
            //自定义验证规则
            validator:function(val){
                return val>10
            }
        }
    }
    })
```
**兄弟组件之间的通信**

事件的触发需要用$emit来实现。我们声明一个独立的空vue公用实例，用来触发通讯的事件，在a组件中用$emit触发事件，在c组件中用on监听事件，实现数据的传递，demo如下：
```javascript
    <div id="app">
        <cop-one></cop-one>
        <cop-two></cop-two>
    </div>
    <script>
        var All = new Vue(); //声明一个独立的公用实例
        var copone = {
            template:'<div>我是第一个组件，我的数据内容是[{{one}}] <button @click="send">发送数据</button></div>',
            data:function(){
                return{
                    one:'我是数据one'
                }
            },
            methods:{
                send(){
                    All.$emit('one-msg',this.one)
                }
            }
        };

        var coptwo = {
            template:"<div>这是第二个组件，我从one组件接收到的数据是:{{two}}</div>",
            data:function(){
                return {
                    two:''
                }
            },
            //组件和页面挂载完后执行
            mounted(){
                //All.$on内部的this指向All实例，所以要预先存起来
                var _this_ = this;
                All.$on('one-msg',function(data){
                    _this_.two = data;
                })
            }
        };

        new Vue({
            el:'#app',
            components:{
                'cop-one':copone,
                'cop-two':coptwo

            }
        })
    </script>
```
![demo2](./img/vue1-2.png)

### 5,内容插槽

让组件的可扩展性更强，它主要的作用就是父组件中自定义的内容插入到子组件所提供的匿名/具名插槽当中。

**单个（匿名）插槽**
```javascript
<div id="example">
    <h3>我是父组件的标题</h3>
    <my-cop>
        <p>一些初始内容</p>
        <p>更多初始内容</p>
    </my-cop>
</div>
<template id="my-tpl">
    <div>
        <h3>我是子组件的标题</h3>
        <slot>
            只有在没有分发的内容时才会显示
        </slot>
    </div>
</template>
<script>
new Vue({
    el:'#example',
    components:{
        'my-cop':{
            template:'#my-tpl'
        }
    }
})
</script>
```
可以看到 slot的地方被传入的p标签替代了

**多个（具名）插槽**

可以用name特性来命名slot。仍然可以有一个匿名插槽，它是默认插槽，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，这些找不到匹配的内容片段将被抛弃。
```jacascript
    <div id="contain">
        <app-layout>
            <!--  在组件调用的时候，标签内部的内容，会被放到template中定义的槽slot标签中,使用slot属性去指定插入哪个slot，如果不指定slot名，就插入没有名字的slot中 -->
            <p slot="slot01">插入slot的值1(p)</p>  
            <ul slot="slot02">
                <li>插入slot的值2(ul)</li>
            </ul>
            <span>插入slot的值3(span)</span>
        </app-layout>
    </div>
    <template id="layout-tpl">
        <div>
            <h3>{{msg}}</h3>
            <slot></slot>  <!-- 用来接收标调用时传入的内部内容-->
            <slot name="slot01"></slot>
            <slot name="slot02"></slot>
        </div>
    </template>
    <script>
        new Vue({
            el:'#contain',
            components:{
                'app-layout':{
                    template:'#layout-tpl',
                    data:function(){
                        return{
                            msg:'示例的值'
                        }
                    }
                }
            }
        });
    </script>
```

应用场景有很多，比如定义添加和编辑的弹出层，只有标题不一样；比如自己写的一个button组件，button上的文字不同，这些文字并不需要动态更新，不必用props来从跟组件传递，直接用slot即可
