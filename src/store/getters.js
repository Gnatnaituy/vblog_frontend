const getters = {
    login: state => {
        if (localStorage.token) {
            state.token = JSON.parse(localStorage.token);
        }
        return state.token !== null
    },
    token: state => {
        return state.token
    }
}

export default getters