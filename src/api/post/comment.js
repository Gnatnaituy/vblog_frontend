import request from '@/request'

export function saveComment(commentSaveVo) {
  return request({
    url: '/post/comment/save',
    method: 'post',
    commentSaveVo
  })
}

export function deleteComment(commentId) {
  return request({
    url: `/post/comment/delete/${commentId}`,
    method: 'delete'
  })
}
