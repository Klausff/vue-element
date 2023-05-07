import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import PubSub from 'pubsub-js'
import * as http from '@/api'
import store from './store'
import * as echarts from 'echarts'
import i18n from './i18n/i18n';
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(PubSub)
new Vue({
  el:'#app',
  router,
  store,
  i18n,
  render: h => h(App),
})
