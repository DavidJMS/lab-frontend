import axios from 'axios'
import LocalStorageUserService from './localStorage'

const API_URL = import.meta.env.VITE_BE_API

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
instance.interceptors.request.use(
  (config) => {
    const token = LocalStorageUserService.getLocalAccessToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (err.response) {
      // Access Token was expired or deleted
      if (err.response.status === 401 && !originalConfig._retry) {
        LocalStorageUserService.removeLocalAccessToken()
        return Promise.reject(err)
      }
    }
    return Promise.reject(err)
  }
)

export default instance
