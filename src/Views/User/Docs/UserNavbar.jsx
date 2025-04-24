import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Icons from 'Utils/Icons';
import Emr from 'Assets/emr.png';

const UserNavbar = ({ onSearch }) => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-3 h-100" style={{ backgroundColor: "#F4F9FD" }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center fs-4" href="#">
          <img src={Emr} alt="Emr" className='Emr-logo' />
          <span className="Emr-heading ms-2">APPLIED</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <form className="d-flex align-items-center mt-3 mt-lg-0 w-100 justify-content-lg-end">
            <Link
              to="/login"
              className={`person-btn btn-outline-primary bg-white border-0 d-flex align-items-center justify-content-center ${location.pathname === "/login" ? "active-icon" : ""
                }`}
              aria-label="Profile"
            >
              {Icons.FbUser}
            </Link>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar
