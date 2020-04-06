// import axios from 'axios'
// import {Message} from 'element-ui'
// import store from '../store'

// axios.defaults.baseURL = 'http://127.0.0.1:9005';
// axios.defaults.timeout = 6000

// //request interceptor
// axios.interceptors.request.use(config => {
//   if (store.getters.getAccessToken) {
//     config.headers.Authorization = `Bearer ${store.getters.getAccessToken}`;
//   }
//   return config
// }, err => {
//   Promise.reject(err)
// })

// // respone interceptor
// axios.interceptors.response.use(
//   response => {
//     const res = response.data;
//     if (res.code !== 1) {
//       Message({
//         type: 'warning',
//         showClose: true,
//         message: res.message
//       })
//       return Promise.reject(res.message);
//     } else {
//       return response.data;
//     }
//   }, err => {
//     Message({
//       type: 'error',
//       showClose: true,
//       message: err
//     })
//     return Promise.reject('error')
//   })

// export default axios
