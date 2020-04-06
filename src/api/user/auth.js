import request from '@/request'

export default function apiLogin(user) {
  console.log('user.auth --> ' + user)
  return request({
    url: '/login',
    method: 'post',
    user
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function register(user) {
  return request({
    url: '/register',
    method: 'post',
    params: {
      username: user.username,
      password: user.password
    }
  })
}

export function changePassword(user) {
  return request({
    url: '/change-password',
    method: 'post',
    params: {
      username: user.username,
      oldPassword: user.oldPassword,
      password: user.password
    }
  })
}
