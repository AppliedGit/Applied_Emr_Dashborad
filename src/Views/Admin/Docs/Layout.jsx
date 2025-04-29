import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#F4F9FD" }}>
      {/* Navbar */}
      <div className="bg-info ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#F4F9FD" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <div className='py-2 text-end px-4'>
        Developed by
        <a href="http://www.aaspl.net" className='ps-1' target="_blank" rel="noopener noreferrer">
          Applied Automation
        </a>
      </div>
    </div>
  )
}

export default Layout
