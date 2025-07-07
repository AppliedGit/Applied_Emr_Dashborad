import ButtonComponent from 'Components/Button/Button';
import React from 'react'
import { useDispatch } from 'ResuableFunctions/CustomHooks';
import Icons from 'Utils/Icons';
import { logout } from 'Views/Common/Slice/Common_slice';

const UserNavbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm px-3" style={{ backgroundColor: "#F4F9FD" }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-2 fs-5 mb-0">
          <span className='Emr-heading'>DCRM ANALYSIS AUTOMATION</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <ButtonComponent
                type="button"
                className="btn btn-light"
                buttonName={Icons.logout_icon}
                clickFunction={() => dispatch(logout())}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default UserNavbar
