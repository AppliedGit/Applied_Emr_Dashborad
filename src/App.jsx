import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from 'Views/Admin/Docs/Layout'
import Create from 'Views/Admin/Docs/Create'
import Home from 'Views/Admin/Docs/Home'
import Folder2 from 'Views/Admin/Docs/Folder2'
import CreateImageModel from 'Views/Admin/Docs/CreateImageModel'
import Userhome from 'Views/User/Docs/Userhome'
import Login from 'Views/Common/Docs/Login'
import { InitializeProjectSetup } from 'Views/Common/Docs/InitializeProjectSetup'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import UserLayout from 'Views/User/Docs/UserLayout'


function App() {

  return (
    <Fragment>
      <ToastContainer theme='light' />

      <BrowserRouter>
        <Routes>
          <Route element={<InitializeProjectSetup />}>
            <Route path="/" element={<Login />} />

            <Route path="/admin_dashboard" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="create" element={<Create />} />
              <Route path="folder/:folder/:file/" element={<Folder2 />} />
              <Route path="createimage/:type" element={<CreateImageModel />} />
            </Route>

            <Route path='/user_dashboard' element={<UserLayout/>}>
              <Route index element={<Userhome />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App

