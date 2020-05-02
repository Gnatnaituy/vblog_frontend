import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from  'axios';
import ElementUI from 'element-ui'
import '@/assets/icon/iconfont.css'
import * as Promise from "lodash";

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.config.devtools = true

axios.interceptors.request.use(config => {
  if (store.state.token.accessToken !== null) {
    config.headers.Authorization = `Bearer ${store.state.token.accessToken}`;
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
