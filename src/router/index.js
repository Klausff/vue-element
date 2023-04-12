import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/pages/login';
import Home from '@/pages/home';
import Goods from '@/pages/goods';
import Main from '@/pages/main';
import Order from '@/pages/order'
import DataCount from '@/pages/dataCount'

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        { 
            path:'/login',
            component:Login
        },
        //主路由
        {
            path:'/main',
            component:Main,
            children:[
                {
                    path:'/home',
                    component:Home,
                    meta:{
                        title:'个人中心'
                    },
                },
                {
                    path:'/goods',
                    name:'goods',
                    component:Goods,
                    meta:{
                        title:'商品管理'
                    }
                },
                {
                    path:'/order',
                    component:Order,
                    meta:{
                        title:'订单管理'
                    }
                },
                {
                    path:'/dataCount',
                    component:DataCount,
                    meta:{
                        title:'数据统计'
                    }
                },
            ]  
        },
        {
            // 把login设置为主页
            path:'',
            redirect:'/login'
        }
    ]
})