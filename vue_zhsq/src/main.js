import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入适配rem
import 'lib-flexible'
// 引入全局iconfont样式
import './assets/icon/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = '/admin'
// axios.defaults.baseURL = 'http://i.threetop.net/iCommunity'
Vue.prototype.$http=axios
Vue.config.productionTip = false
window.eventBus = new Vue();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
