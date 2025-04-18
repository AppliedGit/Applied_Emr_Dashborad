import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Admin/Layout'
import Create from './Pages/Admin/Create'
import Home from './Pages/Admin/Home'
import Folder2 from './Pages/Admin/Folder2'
import CreateImageModel from './Pages/Admin/CreateImageModel'
import Login from './Pages/Admin/Login'
import UserLayout from './Pages/User/UserLayout'
import Userhome from './Pages/User/Userhome'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="folders/:type" element={<Folder2 />} />
          <Route path="createimage/:type" element={<CreateImageModel />} />
        </Route>

        <Route path='/userhome' element={<UserLayout />}>
          <Route index element={<Userhome />} />
        </Route>





      </Routes>
    </BrowserRouter>
  )
}

export default App

