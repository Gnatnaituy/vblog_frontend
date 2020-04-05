import request from '@/request'

export function userSearch(userSearchVo) {
  return request({
    url: '/open/user/search',
    method: 'post',
    userSearchVo
  })
}

export function userDetail(userId) {
  return request({
    url: `/open/user/detail/${userId}`,
    method: 'get'
  })
}

export function getCurrentUser() {
  return request({
    url: '/user/account/info',
    method: 'get'
  })
}
