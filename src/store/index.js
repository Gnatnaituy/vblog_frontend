import Vuex from 'vuex'
import Vue from 'vue'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken} from '../utils/token'
import { login, register, logout } from '../api/user/auth'
import { getCurrentUser } from "../api/user/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    username: '',
    nickname: '',
    avatar: '',
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
  },

  mutations: {
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken;
    }
  },

  actions: {
    storeLogin({commit}, user) {
      console.log('store --> ' + user)
      return new Promise((resolve, reject) => {
        login(user).then(response => {
          console.log('store --> ' + response.data)
          commit('SET_ACCESS_TOKEN', response.data.data.accessToken)
          console.log(response.data.accessToken)
          commit('SET_REFRESH_TOKEN', response.data.data.refreshToken)
          setAccessToken(response.data.data.accessToken)
          setRefreshToken(response.data.data.refreshToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    storeGetCurrentUser({commit, state}) {
      return new Promise((resolve, reject) => {
        getCurrentUser().then(data => {
          if (data.data) {
            commit('SET_USER_ID', data.data.userId)
            commit('SET_USERNAME', data.data.username)
            commit('SET_NICKNAME', data.data.nickname)
            commit('SET_AVATAR', data.data.avatar)
          } else {
            commit('SET_USER_ID', '')
            commit('SET_USERNAME', '')
            commit('SET_NICKNAME', '')
            commit('SET_AVATAR', '')
            removeAccessToken()
            removeRefreshToken()
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    storeLogout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(data => {
          commit('SET_USER_ID', '')
          commit('SET_USERNAME', '')
          commit('SET_NICKNAME', '')
          commit('SET_AVATAR', '')
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          removeAccessToken()
          removeRefreshToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    storeRegister({commit}, user) {
      return new Promise((resolve, reject) => {
        register(user).then((data) => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
