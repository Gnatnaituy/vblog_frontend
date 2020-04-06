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
  }
}

export default mutations