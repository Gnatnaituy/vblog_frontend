const getters = {

    // Judge is logged in or not
    isLogIn: state => {
        if (localStorage.token) {
            state.token = JSON.parse(localStorage.token);
            if (state.token.expiresTime <= new Date().getTime()) {
                state.token = null,
                localStorage.token = ''
            }
        }

        return state.token !== null
    },

    token: state => {
        return state.token
    }
}

export default getters