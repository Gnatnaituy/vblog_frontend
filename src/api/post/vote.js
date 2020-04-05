import request from '@/request'

export function vote(voteVo) {
  return request({
    url: '/post/vote/vote',
    method: 'post',
    voteVo
  })
}
