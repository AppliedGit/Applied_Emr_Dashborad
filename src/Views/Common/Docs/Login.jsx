import React from 'react'
import LoginForm from 'Components/Form/LoginForm'
import Img from 'Components/Img/Img'
import Image from 'Utils/Image'

const Login = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 login-large-screen-width">
        <div className="card border border-light-subtle rounded-4 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5 py-5">
            <div className="text-center mb-3">
              <div className="text-center mb-3">
                <Img
                  src={Image.CompanyLogo}
                  alt="modelrocket-logo"
                  width="120rem"
                  height="40rem"
                />
                {/* <h2 style={{ color: 'red', fontWeight: 'bold', letterSpacing: "2px" }}>EMR</h2> */}
                {/* <h1 style={{ fontWeight: "500", color: "#2D9AE5",fontSize:"28px" }}>APPLIED</h1> */}

              </div>
            </div>
            <LoginForm />

            <div className="text-center mt-4">
              <small className="text-muted" >
                Developed by <span style={{color: "#2D9AE5"}}>Applied Automation</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
