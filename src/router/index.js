import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import store from '../store'
import { Message } from 'element-ui';
import getAccessToken from '../request'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

// router.beforeEach((to, from, next) => {
//   if (getAccessToken) {
//     if (to.path === '/login') {
//       next({path: '/'})
//     } else {
//       if (store.state.username.length === 0) {
//         store.dispatch('getCurrentUser').then(data => { //获取用户信息
//           next()
//         }).catch(() => {
//           next({path: '/'})
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (to.matched.some(r => r.meta.requireLogin)) {
//       Message({
//         type: 'warning',
//         showClose: true,
//         message: '请先登录哦'
//       })
//     } else {
//       next();
//     }
//   }
// })


export default router
