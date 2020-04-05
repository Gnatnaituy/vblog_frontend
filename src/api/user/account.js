import request from '@/request'

export function updateInfo(userInfoUpdateVo) {
  return request({
    url: '/user/account/update',
    method: 'post',
    userInfoUpdateVo
  })
}
