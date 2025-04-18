import React, { useState } from 'react'
import Icons from '../../Utils/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Folder from './Folder';
import { Button, Navbar } from 'react-bootstrap';


const Home = () => {
  
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
 
  return (
    <>
      <div className="container mt-4">
        <div className="row align-items-center px-3">
          <div className="col-md-6 col-8">
            <h3 className="heading">DCRM</h3>
          </div>
          <div className="col-md-6 col-4 g-1 mb-1 d-flex justify-content-end" onClick={()=>navigate('/create')}>
            <Button
              className=" btn btn d-flex align-items-center border-0 px-2 py-1"
              title="Create Image Model"style={{backgroundColor:"#2D9AE5"}}
            >
              {Icons.Pulse}
              <span className="d-none d-md-inline ms-2">Create Image Model</span>
            </Button>
          </div>
        </div>
        <hr className="divider" />

        <div className="row mt-3 ">
          <Navbar onSearch={(val) => setSearchTerm(val)} />
          <Folder searchTerm={searchTerm} />
        </div>
      </div>
    </>
  )
}

export default Home