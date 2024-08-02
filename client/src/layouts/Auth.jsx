import React from 'react'
import { Navigate } from 'react-router-dom'

function Auth({ children }) {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/signIn" />
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Auth
