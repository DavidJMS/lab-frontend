import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const userId = useSelector(state => state.user?.userInfo?.token)
  return (userId ? <Outlet /> : <Navigate to='/login' />)
}

export default PrivateRoute
