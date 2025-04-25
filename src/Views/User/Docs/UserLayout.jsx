import React from 'react'
import UserNavbar from './UserNavbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#F4F9FD" }}>
      <div className="bg-info">
        <UserNavbar />
      </div>

      <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#F4F9FD" }}>
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout

