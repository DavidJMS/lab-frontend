// My Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// My Services
import { login } from '../services/auth'
import LocalStorageUserService from '../services/localStorage'

// userAction.js
export const loginUser = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await login(data)
    console.log(response)
    if (response) {
      console.log(response.user)
      LocalStorageUserService.setUser(response)
      return response.user
    }
    return false
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(false)
    } else {
      return rejectWithValue(false)
    }
  }
})