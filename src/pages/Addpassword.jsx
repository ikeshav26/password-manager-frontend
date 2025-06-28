import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Addpassword = () => {
  const [title, settitle] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const formdata = {
      title,
      username,
      email,
      password
    }

    settitle("")
    setusername("")
    setemail("")
    setpassword("")

    axios.post("http://localhost:3000/api/password/add-password", formdata, {
      withCredentials: true
    })
      .then((response) => {
        toast.success("Password saved successfully")
      })
      .catch((error) => {
        console.error("Error during saving password:", error)
        toast.error("An error occurred saving password. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='bg-white text-black w-full min-h-screen pt-24 px-6 md:px-20'>
      <div className='max-w-2xl mx-auto bg-gray-50 shadow-md p-8 rounded-xl'>
        <h2 className='text-2xl font-bold text-[#001834] mb-6'>Add New Password</h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input
              value={title}
              onChange={(e) => settitle(e.target.value)}
              type='text'
              placeholder='e.g. Google, Facebook...'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type='text'
              placeholder='Enter your username'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type='email'
              placeholder='you@example.com'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type='password'
              placeholder='Enter password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg outline-indigo-500'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`mt-4 w-full font-medium py-2 px-4 rounded-lg transition text-white ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#001834] hover:bg-indigo-950 hover:scale-102'
            }`}
          >
            {loading ? 'Saving...' : 'Save Password'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Addpassword
