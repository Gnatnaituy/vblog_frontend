const state = {
    token: {
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
    },

    searchVo: {
        keyword: null,
        topic: null,
        poster: null,
        start: 0,
        size: 20
    },
    posts: [],
    loading: false,
    noNewPosts: false,

    hotWords: [],

    hotTopics: [],
    currentTopic: {
        id: null,
        name: null,
        description: null,
        background: null,
        activeUsers: [],
        createUser: null,
        createTime: null
    },

    hotUsers: [],
    recommendUsers: [],
    currentUser: {
        id: null,
        username: null,
        age: null,
        avatar: null,
        background: null,
        bio: null,
        blocks: [],
        city: null,
        country: null,
        email: null,
        gender: null,
        nickname: null,
        phone: null,
        province: null,
        registerTime: null
    }
}

export default state
