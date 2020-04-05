import request from '@/request'

export function blockUser(blockVo) {
  return request({
    url: '/user/account/update',
    method: 'post',
    blockVo
  })
}

export function unblockUser(unblockVo) {
  return request({
    url: '/user/account/update',
    method: 'post',
    unblockVo
  })
}
