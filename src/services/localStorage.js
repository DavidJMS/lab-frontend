class LocalStorageUserService {

  setUser(data) {
    window.localStorage.setItem('user', JSON.stringify(data))
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

  removeUser() {
    window.localStorage.removeItem('user')
  }
}
export default new LocalStorageUserService()
