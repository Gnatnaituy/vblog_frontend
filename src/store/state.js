const state = {
  // User related data
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
  hotUsers: [],
  currentUser: {
    id: null,
    username: null,
    nickname: null,
    email: null,
    phone: null,
    avatar: null,
    background: null,
    bio: null,
    age: null,
    gender: null,
    country: null,
    province: null,
    city: null,
    registerTime: null,
    blocks: [],
    friendStatus: null,
    blocked: null
  },

  blocks: [],
  friends: [],
  friendRequests: [],

  // Post related data
  searchVo: {
    postId: null,
    keyword: null,
    topic: null,
    poster: null,
    start: 0,
    size: 20
  },
  posts: [],
  loading: false,
  noNewPosts: false,

  messageVotes: [],
  messageComments: [],

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
  }
}

export default state
