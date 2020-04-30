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
        size: 20
    },
    loading: false,
    noNewPosts: false,

    // advanced function related data
    hotWorlds: [],
    hotTopics: [],
    hotUsers: [],
    recommendUsers: []
}

export default state