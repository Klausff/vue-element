import Vue  from "vue";
import vuex from 'vuex'
Vue.use(vuex)
import login from './login'
import goods from './goods'
import order from './order'
//对外暴露仓库
export default new vuex.Store({
    modules:{
        login,
        goods,
        order
    }
})