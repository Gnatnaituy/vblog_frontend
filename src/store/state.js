let defaultToken = null

try {
    if (sessionStorage.token) {
        // if there is token stored in localStorage, get it
        defaultToken = JSON.parse(sessionStorage.token)
    }
} catch (e) {}

const state = {
    token: defaultToken,
    posts: [],
    page: {
        start: 0,
        size: 10
    }
}

export default state