const mutations = {
  // Set token when login
  setToken (state, token) {
    state.token = token
    try {
      localStorage.token = JSON.stringify(token)
    } catch (e) {}
  },

  // Clear token when logout 
  clearToken (state) {
    localStorage.token = ''
    state.token = null
  },

  // Init posts when start project
  listPosts (state, newPosts) {
    state.posts = state.posts.concat(newPosts)
  },
  
  // Push a new post
  pushPost (state, newPost) {
    state.posts.unshift(newPost)
  },

  changePageStart (state, start) {
    state.page.start = start
  },
  changePageSize (state, size) {
    state.page.size = size
  }
}

export default mutations