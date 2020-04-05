import request from '@/request'

export function login(user) {
  console.log('user.auth --> ' + user.username)
  return request({
    url: '/login',
    method: 'post',
    params: {
      username: user.username,
      password: user.password
    }
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
