export function getRedisAccessToken() {
  return localStorage.redisAccessToken
}

export function setRedisAccessToken(redisAccessToken) {
  return localStorage.redisAccessToken = redisAccessToken
}

export function removeRedisAccessToken() {
  return localStorage.removeItem('redisAccessToken')
}
