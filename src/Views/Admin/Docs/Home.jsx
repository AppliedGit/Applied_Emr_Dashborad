import React, { useEffect } from 'react'
import Icons from 'Utils/Icons';
import { Button, Navbar } from 'react-bootstrap';
import useCommonState, { useCustomNavigate, useDispatch } from 'ResuableFunctions/CustomHooks';
import { handle_get_dir } from '../Action/AdminAction';
import FolderCard from '../../../Components/Card/FolderCard';
import SpinnerComponent from 'Components/Spinner/Spinner';
import Image from 'Utils/Image';

const Home = () => {
  const { adminState } = useCommonState()
  const dispatch = useDispatch()
  const navigate = useCustomNavigate()

  useEffect(() => {
    if (adminState?.dir_glow) {
      dispatch(handle_get_dir())
    }
  }, [adminState?.dir_glow])

  return (
    <div className="container mt-2">
      <div className="row align-items-center px-3">
        <div className="col-md-6 col-8">
          <img src={Image?.CompanyLogo} alt="Emr" className='Emr-logo' />
        </div>
        <div className="col-md-6 col-4 g-1 mb-1 d-flex justify-content-end" onClick={() => navigate('/admin_dashboard/create')}>
          <Button
            className=" btn btn d-flex align-items-center border-0 px-2 py-1"
            title="Create Image Model" style={{ backgroundColor: "#2D9AE5" }}
          >
            {Icons.Pulse}
            <span className="d-none d-md-inline ms-2">Create Image Model</span>
          </Button>
        </div>
      </div>

      <hr className="divider" />

      <div className="row mt-3 user_home_height">
        {
          adminState?.dir_glow ?
            <div className="h-100 row align-items-center justify-content-center">
              <div className="col-6 text-center">
                <SpinnerComponent variant="primary" />
                <p className='mt-1'>Collecting data..</p>
              </div>
            </div>
            :
            adminState?.dir_data?.length ?
              <div className="container">
                <h4>Image Libraries</h4>
                <div className="row g-4 py-4">
                  {adminState?.dir_data?.map((item, index) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={index}>
                      <FolderCard item={item} is_under_tarining={adminState?.is_under_tarining} />
                    </div>
                  ))}
                </div>
              </div>
              :
              <div className="text-center">
                No folders found
              </div>
        }
      </div>
    </div>
  )
}

export default Home