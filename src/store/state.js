const state = {
    // user related data and state
    token: null,
    user: null,

    // post related data and state
    posts: [],
    searchVo: {
        keyword: '',
        topic: null,
        poster: null,
        start: 0,
        size: 2
    },
    loading: false,
    noNewPosts: false,

    // advanced function related data
    hotWorlds: [],
    topUsers: [],
    topToics: [],
    recommendUsers: []
}

export default state