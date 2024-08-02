import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function UnAuth({ children }) {

  const { pathname } = useLocation()

  const token = localStorage.getItem("token")
  if (token && pathname !== "/") {
    return <Navigate to="/" />
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default UnAuth;
