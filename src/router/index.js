import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/WoDe.vue'
import BuBar from '@/views/Layout/BuBar.vue'
import ShouYe from '@/views/Home/ShouYe'
import WoDe2 from '@/views/User/WoDe2'
import search from '@/views/search/ShouSuo'
import searchList from '@/views/search/searchList'
import WZxiangqing from '@/views/ArticleDetail/WZxiangqing.vue'
import UserEdit from '@/views/User/UserEdit'
import XiaoSi from '@/views/Chat/XiaoSi'

import { getToken } from '@/utils/token'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/BuBar/ShouYe'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/Bubar',
    component: BuBar,
    children: [
      {
        path: 'ShouYe',
        component: ShouYe
      },
      {
        path: 'WoDe2',
        component: WoDe2
      }
    ]
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/searchList/:kw',
    component: searchList
  },
  {
    path: '/detail',
    component: WZxiangqing
  },
  {
    path: '/UserEdit',
    component: UserEdit
  },
  {
    path: '/chat',
    component: XiaoSi
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (getToken()?.length > 0 && to.path === '/login') {
    next('/Bubar/ShouYe')
  } else {
    next()
  }
})

export default router
