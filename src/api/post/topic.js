import request from '@/request'

export function updateTopic(topicUpdateVo) {
  return request({
    url: '/post/topic/update',
    method: 'post',
    topicUpdateVo
  })
}
