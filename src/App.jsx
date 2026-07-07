import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'
import CompanyProfile from './pages/CompanyProfile'
import ManageJobs from './pages/ManageJobs'
import Notifications from './pages/Notifications'
import PostAJob from './pages/PostAJob'
import AdminLayout from './AdminLayout'
import Applications from './pages/Applications'
import ViewEmployer from './pages/ViewEmployer'
import UserLayout from './UserLayout'
import Userprofile from './pages/UserProfile'
import UserApplications from './pages/UserApplications'
import UserNotifictions from './pages/UserNotifictions'
import ViewUserProfile from './pages/ViewUserProfile'
import Jobs from './pages/Jobs'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/login' element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminHome />} />

          <Route path="companyprofile" element={<CompanyProfile />} />

          <Route path="postajob" element={<PostAJob />} />

          <Route path="managejobs" element={<ManageJobs />} />

          <Route path="applications" element={<Applications />} />

          <Route path="notifications" element={<Notifications />} />

          <Route path="viewemployer" element={<ViewEmployer />} />

        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="userprofile" element={<Userprofile />} />
          <Route path="applications" element={<UserApplications />} />
          <Route path="notifications" element={<UserNotifictions />} />
          <Route path="viewuser" element={<ViewUserProfile />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
