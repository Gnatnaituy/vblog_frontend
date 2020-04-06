import request from '@/request'

export function savePost(postSaveVo) {
  return request({
    url: '/post/post/save',
    method: 'post',
    data: postSaveVo
  })
}

export function deletePost(postId) {
  return request({
    url: `/post/post/${postId}`,
    method: 'delete'
  })
}

export function apiListPosts(postSearchVo) {
  return request.post('/open/post/list', postSearchVo)
}

export function listVoters(postId) {
  return request({
    url: `/open/post/voters/${postId}`,
    method: 'get'
  })
}

export function listComments(postId) {
  return request({
    url: `/open/post/comments/${postId}`,
    method: 'get'
  })
}

export function listReplies(commentId) {
  return request({
    url: `/open/post/comments/replies/${commentId}`,
    method: 'get'
  })
}



