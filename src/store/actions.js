import axios from 'axios'

const actions = {
  main (context, postId) {
    context.commit('changeSearchVo', {
      postId: postId,
      keyword: null,
      topic: null,
      poster: null,
      start: 0,
      size: 20
    })
    context.commit('changeNoNewPosts', false)
    context.commit('clearPosts')
    console.log(context.state.searchVo)
  },

  post (context, keyword) {
    context.commit('changeSearchVo', {
      postId: null,
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
      postId: null,
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
      postId: null,
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
