import Vue from 'vue'
// import axios from 'axios'
//引入封装的axios请求
import axios from './assets/js/http.js'
//引入自定义过滤器
import * as customFilter from './assets/js/filters.js'
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//重置样式css
import '../../static/css/reset.css'
//引入公共样式css
import '../../static/css/common.css'
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import  'swiper/dist/css/swiper.css'
//引入阿里矢量图标
import './assets/iconfont/iconfont.css'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

//全局应用部分
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

//全局应用自定义过滤器
Object.keys(customFilter).forEach(key => {
  Vue.filter(key, customFilter[key])
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
