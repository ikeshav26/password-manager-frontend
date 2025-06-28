import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Addpassword from './pages/Addpassword'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SavedPassword from '../src/pages/SavedPassword'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'


const App = () => {
  const location = useLocation()
  const pathname = location.pathname
  return (
    <div className='text-black'>
      {window.location.pathname !== '/login' && pathname !== '/signup' && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-password' element={<Addpassword/>}/>
        <Route path='/saved-password' element={<SavedPassword/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
