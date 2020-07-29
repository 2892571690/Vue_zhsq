import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Index from '../pages/index/Index.vue'
import xqxx from '../pages/Basics/xqxx.vue'
import xqxxtj from '../pages/Basics/xqxxzj.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/xqxx',
        component: xqxx
      },
      {
        path: '/xqxxtj',
        component: xqxxtj
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
