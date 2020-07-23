import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'lib-flexible'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
window.eventBus = new Vue();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
