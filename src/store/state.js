let defaultToken = null

try {
    if (sessionStorage.token) {
        console.log('state.token', sessionStorage.token)
        defaultToken = JSON.parse(sessionStorage.token)
    }
} catch (e) {}

const state = {
    token: defaultToken
}

export default state