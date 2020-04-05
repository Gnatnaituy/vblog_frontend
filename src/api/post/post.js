import request from '@/request'
import axios from 'axios'

export function savePost(postSaveVo) {
  return request({
    url: '/post/post/save',
    method: 'post',
    postSaveVo
  })
}

export function deletePost(postId) {
  return request({
    url: `/post/post/${postId}`,
    method: 'delete'
  })
}

export function listPost(postSearchVo) {
  return axios.post('/open/post/list', postSearchVo)
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



