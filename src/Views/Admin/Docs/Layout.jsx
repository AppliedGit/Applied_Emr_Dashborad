import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


const Layout = () => {

  return (
    <div className="d-flex flex-column min-vh-100  " style={{ backgroundColor: "#F4F9FD" }}>
      {/* Navbar */}
      <div className="bg-info ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#F4F9FD" }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
