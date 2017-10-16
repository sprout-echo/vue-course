# Vuex篇

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。在开发大型单页面应用（SPA）,会出现多个组件依赖同一
个状态，来自不同的视图的行为要变更同一个状态，这个时候，就可以用vuex，把组件的共享状态抽取出来，单做一个
全局的单例模式进行管理。

**安装**

也可以直接下载vuex，然后用script标签引入 ```<script src="vuex.js"></script>```，然后就可以直接使用了

当然通常大家都会选择用vue全家桶，用npm来安装开发项目```npm install vuex --save```在模块的打包系统中，
必须显示地通过Vue.use()来安装vuex,这个我们下一节再细讲

**开始**

首先，我们看一下简单的demo
```javascript
const store = new Vuex.store({
    state:{
        count:0,
        temp:[],
        arr1:[
            {id:1,done:true},
            {id:2,done:false}
        ]
    },
    mutations:{
        increment(satate){
            state.count ++
        },
        getAllArr(state,temp){
            state.temp = temp
        }
    },
    actions:{
        getArr(context){
            const arr = {
                name:'标题',
                tags:'标签',
                cover:'封面'
            }
            context.commit('getAllArr',arr)
        }
    },
    getters:{
        doneArr(state){
            return state.arr1.filter(function(item){item.done})
        }
    }
})

```
上面的demo只是为了说明结构，每个应用都只包含一个store实例。

**state** 负责存储整个应用的状态数据，我们在每个需要使用state的组件中导入全局状态，然后就可以在computed计算属性中使用
store.state.count来使用。但是很多组件导入很繁琐，我们只需要在跟组件中，通过一个store选项就可以注入到每个子组件中
```
const app = new Vue({
    el:'#app',
    store,
    //...
})
```
然后在子组件中可以使用 this.$store.state直接获取

也可以使用vuex提供的mapState辅助函数（使用辅助函数的前提是在根节点注入store）将state映射到计算属性中,因为如果有很多状态，把这些状态都声明为计算属性
会重复和冗余。mapState返回的是一个对象，如果我们想要把它与局部的计算属性混合使用，将多个对象合并为一个，可以
用对象展开运算符 ...
```
import {mapState} from 'vuex'
export default{
    //...
    computed:mapState({
        count:state => state.count
    })
}
```
**mutation** 更改vuex的store中状态的唯一方法就是提交mutation，有一个回调函数，用于实际修改状态。传入state作为
第一个参数。这里需要注意的是 mutation必须是同步函数

在组件中，我们可以使用 this.$store.commit()来提交mutation，或者使用mapMutations辅助函数将组件中的methods
映射为store.commit来调用
```
import {mapMutations} from 'vuex'
export default{
    methods:{
        mapMutations(['increment']),
        ...mapMutations({
            //将this.add映射为 this.$store.commit('increment')
            add:'increment'
        })
    }
}
```
**Actions** 类似于上面的mutation,也可以用于改变状态，不过是通过触发mutation来实现的，并且它可以包含异步操作。
action函数接受一个域store实例具有相同方法和属性的context对象，通过调用context.commit()来提交mutation

可以用ES6的参数解构来简化代码（特别是需要commit很多次的时候）
```
actions:{
    increment({commit}){
        commit('increment')
    }
}
```
对于同步的函数，我们触发mutation来执行就可以，但是异步的就不能了，我们可以用```store.dispatch('increment')```来触发

在组件中可以使用```this.$store.dispatch()```分发action，或者使用mapActions辅助函数将组件的methods映射为store.dispatch
调用。

**getter** 有些状态需要进行二次处理，比如对列表过滤并计数。getter可以认为是store的计算属性，它的返回值会根据它的依赖被缓存起来，只有当依赖值发生改变才会被重新计算

getter接受state作为第一个参数，也可以接受其他getter作为第二个参数，可以通过store.getters.doneArr调用
在组件中用this.$store.getters.doneArr，可以通过给getter返回一个函数，实现给getter传参，对store里的数组查询非常有用
```
getters:{
    getArrById:(state,getters)=>(id)=>{
        return state.arr1.find(item=>item.id === id)
    }
}

store.getters.getArrById(2)
```
getters同样也有辅助函数mapGetters，它仅仅是将store中的getter映射到局部计算属性中

我们上面介绍的是单一状态树，如果一个应用非常复杂的话，会使store对象很复杂，所以也可以将store分割成**module**,每个模块拥有自己的state，mutation,actions,getter

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
对于模块的详细介绍，还是移步到[vuex文档](https://vuex.vuejs.org/zh-cn/modules.html)
