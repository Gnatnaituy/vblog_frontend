import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null
  },

  getters: {
    getToken: state => {
      return state.token
    },
    isLogin() {
      if (getToken !== null && getToken.expiresTime > new Date().getTime) {
        return true;
      } else {
        return false;
      }
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  }
})
