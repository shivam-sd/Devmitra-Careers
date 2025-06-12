import React from 'react'
import {Route, Routes} from "react-router-dom";
import LoginPage from './Pages/LoginPage'
import DashboardAdmin from './Pages/DashboardAdmin'
import FeedAllJobs from './Pages/FeedAllJobs'
import PostJobs from './Pages/PostJobs'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element={<FeedAllJobs />} />
      <Route path='/Adminlogin' element={<LoginPage />} />
      <Route path='/DashboardAdmin' element={<DashboardAdmin />} />
      <Route path='/PostJobs' element={<PostJobs />} />
     </Routes>
    </div>
  )
}

export default App
