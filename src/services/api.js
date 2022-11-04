// My Imports
import axios from 'axios'

const API_URL = import.meta.env.VITE_BE_API

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
export default instance
