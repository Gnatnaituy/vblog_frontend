import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login"
import Register from "../views/Register";
import PostHome from '../views/PostHome'
import UserHome from '../views/UserHome'
import TopicHome from '../views/TopicHome'
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
      path: '/post',
      name: 'SearchHome',
      component: SearchHome,
    },
    {
      path: '/topic',
      name: 'TopicHome',
      component: TopicHome,
    },
    {
      path: '/user',
      name: 'UserHome',
      component: UserHome,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (this.$store.getters.isLogin) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
