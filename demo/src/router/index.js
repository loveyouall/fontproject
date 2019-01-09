import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import login from '@/components/login'
import manager from '@/components/manager'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manager',
      name: 'manager',
      component: manager
    }
  ]
})
