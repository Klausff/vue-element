import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import PubSub from 'pubsub-js'
import * as http from '@/api'
import store from './store'
import * as echarts from 'echarts'
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(PubSub)
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
})
