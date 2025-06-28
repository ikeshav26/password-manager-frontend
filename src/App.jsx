import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Addpassword from './pages/Addpassword'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SavedPassword from '../src/pages/SavedPassword'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import passwordContext from './context/AppContext'


const App = () => {
  const location = useLocation()
  const pathname = location.pathname
  const {user,setUser,navigate}=useContext(passwordContext)
  return (
    <div className='text-black'>
      {window.location.pathname !== '/login' && pathname !== '/signup' && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-password' element={user?<Addpassword/>:<Navigate to='/login'/>}/>
        <Route path='/saved-password' element={user?<SavedPassword/>:<Navigate to='/login'/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
