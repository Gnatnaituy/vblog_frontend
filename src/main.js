import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import lodash from 'lodash'
import axios from  'axios';
import ElementUI from 'element-ui'
import '@/assets/icon/iconfont.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.config.devtools = true

Object.defineProperty(Vue.prototype, '$_', { value: lodash })
Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})

axios.interceptors.request.use(config => {
  if (store.getters.token !== null) {
    config.headers.Authorization = `Bearer ${store.getters.token.accessToken}`;
  }
  return config
}, err => {
  Promise.reject(err)
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
