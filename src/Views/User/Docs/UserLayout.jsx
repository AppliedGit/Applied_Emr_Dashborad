import React from 'react'
import UserNavbar from './UserNavbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#F4F9FD" }}>
      <div className="bg-info">
        <UserNavbar />
      </div>

      <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#F4F9FD" }}>
        <Outlet />
      </div>

      <div className='py-2 text-end px-4'>
        Developed by
        <a href="http://www.aaspl.net" className='ps-1' target="_blank" rel="noopener noreferrer">
          Applied Automation
        </a>
      </div>
    </div>
  )
}

export default UserLayout

