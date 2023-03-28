// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../action/userAction'
import LocalStorageUserService from '@/services/localStorage'

const initialState = {
  loading: false,
  userInfo: LocalStorageUserService.getUser(),
  error: null,
  success: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [loginUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.userInfo = { ...payload }
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    }
  }
})
export default userSlice.reducer
