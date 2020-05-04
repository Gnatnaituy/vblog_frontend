const mutations = {
  // token
  setToken (state, token) {
    state.token = token
    localStorage.token = JSON.stringify(token)
  },
  clearToken (state) {
    localStorage.token = ''
    state.token = {
      userId: null,
      username: null,
      accessToken: null,
      avatar: null,
      background: null,
      bio: null,
      expiresIn: null,
      expiresTime: null,
      jti: null,
      nickname: null,
      refreshToken: null,
      roles: [],
      scope: null,
      tokenType: null
    }
  },

  // searchVo
  changeSearchVo(state, searchVo) {
    state.searchVo = searchVo
  },

  // posts
  clearPosts (state) {
    state.posts = []
  },
  appendNewPosts (state, newPosts) {
    state.posts = state.posts.concat(newPosts)
  },
  pushPost (state, newPost) {
    state.posts.unshift(newPost)
  },
  changeLoading (state, loading) {
    state.loading = loading
  },
  changeNoNewPosts (state, noNewPosts) {
    state.noNewPosts = noNewPosts
  },

  initMessageVotes (state, messageVotes) {
    state.messageVotes = messageVotes
  },
  initMessageComments (state, messageComments) {
    state.messageComments = messageComments
  },

  // word
  initHotWords (state, words) {
    state.hotWords = words
  },

  // topic
  initHotTopics (state, topics) {
    state.hotTopics = topics
  },
  changeCurrentTopic (state, topic) {
    state.currentTopic = topic
  },

  // user
  initHotUsers (state, users) {
    state.hotUsers = users
  },
  initRecommendUsers (state, users) {
    state.recommendUsers = users
  },
  changeCurrentUser (state, user) {
    state.currentUser = user
  },
  initFriends (state, friends) {
    state.friends = friends
  }
}

export default mutations
