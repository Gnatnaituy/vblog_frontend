const mutations = {
  setToken (state, token) {
    state.token = token
    try {
      localStorage.token = JSON.stringify(token)
    } catch (e) {}
  },

  clearToken (state) {
    localStorage.token = ''
    state.token = null
  },

  clearPosts (state) {
    state.posts = []
  },

  appendNewPosts (state, newPosts) {
    state.posts = state.posts.concat(newPosts)
  },
  
  pushPost (state, newPost) {
    state.posts.unshift(newPost)
  },

  changeSearchVo(state, searchVo) {
    state.searchVo = searchVo
  },

  changeLoading (state, loading) {
    state.loading = loading
  },

  changeNoNewPosts (state, noNewPosts) {
    state.noNewPosts = noNewPosts
  },

  initHotWorlds (state, hotWorlds) {
    state.hotWorlds = hotWorlds
  },

  initHotTopics (state, hotTopics) {
    state.hotTopics = hotTopics
  }
}

export default mutations