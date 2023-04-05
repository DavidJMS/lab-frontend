import api from './api'

const login = async (data) => {
  try {
    const resp = await api.post('auth/login/', data)
    if (resp.status === 201) return { data: resp.data, error: false }
    throw Error
  } catch (res) {
    return { message: res?.response?.data?.general ? res?.response?.data?.general[0] : 'Hubo un error', error: true }
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
