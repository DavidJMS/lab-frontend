import api from './api'

const login = async (data) => {
  try {
    const resp = await api.post('auth/login/', data)
    if (resp.status === 201) return true
    throw Error
  } catch (error) {
    return false
  }
}

const logout = (props) => {
  try {
    let url = 'auth/logout/'
    if (props?.dni) {
      url = url + `?dni=${props.dni}`
    }
    const res = api.post(url)
    return res
  } catch {
    console.log()
  }
}

export {
  login,
  logout
}
