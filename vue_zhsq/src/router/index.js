import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Index from '../pages/index/Index.vue'
import xqxx from '../pages/Basics/xqxx.vue'
import xqxxtj from '../pages/Basics/xqxxzj.vue'
import ldxx from '../pages/Basics/ldxx.vue'
import lczj from '../pages/Basics/lczj.vue'
import lcplzj from '../pages/Basics/lcplzj.vue'
import fwxx from '../pages/Basics/fwxx.vue'
import mphList from '../components/mphList.vue'
import fwxxck from '../pages/Basics/fwxxck.vue'
import fwxxbj from '../pages/Basics/fwxxbj.vue'
import crkxx from '../pages/Basics/crkxx.vue';
import crktj from '../pages/Basics/crktj.vue';
import zhxx from '../pages/Personnel/zhxx.vue';
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
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
      },
      {
        path: '/ldxx',
        component: ldxx
      },
      {
        path: '/lczj',
        component: lczj
      },
      {
        path: '/lcplzj',
        component: lcplzj
      },
      {
        path: '/fwxx',
        component: fwxx,
        // redirect: '/mphList',
        children: [
          {
            path: '/mphList',
            component: mphList
          }
        ]
      },
      {
        path: '/fwxxck',
        component: fwxxck
      },
      {
        path: '/fwxxbj',
        component: fwxxbj
      },
      {
        path: '/crkxx',
        component: crkxx
      },
      {
        path: '/crktj',
        component: crktj
      },
      {
        path: '/zhxx',
        component: zhxx
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
