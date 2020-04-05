export function getAccessToken() {
  return localStorage.accessToken
}

export function getRefreshToken() {
  return localStorage.refreshToken
}

export function setAccessToken(accessToken) {
  return localStorage.accessToken = accessToken
}

export function setRefreshToken(refreshToken) {
  return localStorage.refreshToken = refreshToken
}

export function removeAccessToken() {
  return localStorage.removeItem('accessToken')
}

export function removeRefreshToken() {
  return localStorage.removeItem('refreshToken')
}
