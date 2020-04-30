import Vue from 'vue'
import Router from 'vue-router'
import PostHome from '../views/PostHome'
import UserHome from '../views/UserHome'
import SearchHome from '../views/SearchHome'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PostHome',
      component: PostHome,
    },
    {
      path: '/profile',
      name: 'UserHome',
      component: UserHome,
    },
    {
      path: '/search',
      name: 'SearchHome',
      component: SearchHome,
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (this.$store.getters.isLogin) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
