import React from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <Outlet /> {/* This will render the child routes */}
    </div>
  )
}

export default AuthLayout