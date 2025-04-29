import ButtonComponent from 'Components/Button/Button';
import React from 'react';
import { useDispatch } from 'ResuableFunctions/CustomHooks';
import Icons from 'Utils/Icons';
import { logout } from 'Views/Common/Slice/Common_slice';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-3 h-100" style={{ backgroundColor: "#F4F9FD" }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center fs-4">
          <span className='Emr-heading'>DCRM ANALYSIS AUTOMATION</span>
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

        <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
          <ButtonComponent
            type="button"
            className="btn-light py-2"
            buttonName={Icons.logout_icon}
            clickFunction={() => dispatch(logout())}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
