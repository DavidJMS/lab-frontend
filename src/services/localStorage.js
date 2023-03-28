class LocalStorageUserService {
  setUser(data) {
    window.localStorage.setItem('user', JSON.stringify(data))
  }

  getUser() {
    return JSON.parse(window.localStorage.getItem('user'))
  }

  getLocalRefreshToken() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user && user.refresh) {
      return user.refresh
    } else {
      return {}
    }
  }

  getLocalAccessToken() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user?.access_token) {
      return 'Bearer ' + user.access_token
    } else {
      return {}
    }
  }

  updateLocalAccessToken(token) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    user.access = token
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    window.localStorage.removeItem('user')
  }
}
export default new LocalStorageUserService()
