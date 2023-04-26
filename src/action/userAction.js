// My Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// My Services
import { login } from '../services/auth'
import LocalStorageUserService from '../services/localStorage'

// userAction.js
export const loginUser = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await login(data)
    if (!response.error) {
      LocalStorageUserService.setUser(response.data)
      return { error: false, ...response.data }
    }
    return response
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(false)
    } else {
      return rejectWithValue(false)
    }
  }
})
