const actions = {
    logout: state => {
        localStorage.token = ''
        state.token = null
    }
}

export default actions