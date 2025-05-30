import React, { useEffect } from 'react'
import LoginForm from 'Components/Form/LoginForm'
import Img from 'Components/Img/Img'
import Image from 'Utils/Image'
import { useDispatch } from 'ResuableFunctions/CustomHooks'
import { reset_logout_triggered } from '../Slice/Common_slice'

const Login = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reset_logout_triggered())
  }, [])

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
              </div>
            </div>
            <LoginForm />
          </div>
          <div className='text-center mb-4'>
            <span className='text-muted'>Developed by</span>
            <a href="http://www.aaspl.net" className='ps-1' target="_blank" rel="noopener noreferrer">
              Applied Automation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
