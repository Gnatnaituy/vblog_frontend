import request from '@/request'

export function sendFriendRequest(friendRequestSendVo) {
  return request({
    url: '/user/friend/request/send',
    method: 'post',
    friendRequestSendVo
  })
}

export function acceptFriendRequest(friendRequestAcceptVo) {
  return request({
    url: '/user/friend/request/accept',
    method: 'post',
    friendRequestAcceptVo
  })
}

export function denyFriendRequest(friendRequestId) {
  return request({
    url: `/user/friend/request/deny/${friendRequestId}`,
    method: 'post',
  })
}


export function ignoreFriendRequest(friendRequestId) {
  return request({
    url: `/user/friend/request/deny/${friendRequestId}`,
    method: 'post'
  })
}

export function deleteFriend(friendDeleteVo) {
  return request({
    url: '/user/friend/delete',
    method: 'post',
    friendDeleteVo
  })
}

export function changeFriendRemark(friendRemarkChangeVo) {
  return request({
    url: '/user/friend/remark',
    method: 'post',
    friendRemarkChangeVo
  })
}

export function changeFriendVisibility(friendVisibilityChangeVo) {
  return request({
    url: '/user/friend/visibility',
    method: 'post',
    friendVisibilityChangeVo
  })
}

export function listFriends(page) {
  return request({
    url: '/user/friend/list',
    method: 'post',
    page
  })
}
