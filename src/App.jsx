import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Addpassword from './pages/Addpassword'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addpassword' element={<Addpassword/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
