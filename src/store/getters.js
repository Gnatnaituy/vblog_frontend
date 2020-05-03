const getters = {
  logged: state => {
    if (state.token.userId !== null) {
      return true
    } else {
      if (localStorage.token !== null && localStorage.token !== '') {
        state.token = JSON.parse(localStorage.token);
        console.log("expiresTime: ", state.token.expiresTime)
        console.log("nowTime: ", new Date().getTime())
        if (state.token.expiresTime <= new Date().getTime()) {
          localStorage.token = ''
          state.token.userId = {
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
          return false
        }
        return true
      } else {
        return false
      }
    }
  }
}

export default getters
