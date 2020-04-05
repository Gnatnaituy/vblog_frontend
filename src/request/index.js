import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 6000
})

//request interceptor
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  if (store.state.accessToken) {
    config.headers['Authorization'] = getAccessToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {

    //全局统一处理 Session超时
    if (response.headers['session_time_out'] === 'timeout') {
      store.dispatch('fedLogOut')
    }

    const res = response.data;
    if (res.code !== 1) {
      Message({
        type: 'warning',
        showClose: true,
        message: res.message
      })
      return Promise.reject(res.message);
    } else {
      return response.data;
    }
  },
  error => {
    Message({
      type: 'warning',
      showClose: true,
      message: '连接超时'
    })
    return Promise.reject('error')
  })

export default service
