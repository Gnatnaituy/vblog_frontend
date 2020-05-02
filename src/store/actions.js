import axios from 'axios'

const actions = {
  main (context) {
    context.commit('changeSearchVo', {
      keyword: null,
      topic: null,
      poster: null,
      start: 0,
      size: 20
    })
    context.commit('changeNoNewPosts', false)
    context.commit('clearPosts')
  },

  post (context, keyword) {
    context.commit('changeSearchVo', {
      keyword: keyword,
      topic: null,
      poster: null,
      start: 0,
      size: 20
    })
    context.commit('changeNoNewPosts', false)
    context.commit('clearPosts')
  },

  topic (context, topicId) {
    context.commit('changeSearchVo', {
      keyword: null,
      topic: topicId,
      poster: null,
      start: 0,
      size: 20
    })
    console.log(context.state.searchVo)
    context.commit('changeNoNewPosts', false)
    context.commit('clearPosts')

    axios.get(`/open/post/topic/${topicId}`).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        context.commit('changeCurrentTopic', res.data.data)
      }
    })
  },

  user (context, userId) {
    context.commit('changeSearchVo', {
      keyword: null,
      topic: null,
      poster: userId,
      start: 0,
      size: 20
    })
    context.commit('changeNoNewPosts', false)
    context.commit('clearPosts')

    axios.get(`/open/user/detail/${userId}`).then(res => {
      if (res.status === 200 && res.data.code === '1') {
        context.commit('changeCurrentUser', res.data.data)
      }
    })
  }
}

export default actions
