import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import passwordContext, { AppContext } from '../context/AppContext'

const Home = () => {
  const {user}=useContext(passwordContext)

  return (
    <div className="bg-white text-black w-full min-h-screen py-30 px-6 md:px-20">
      
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001834] mb-6">
            Welcome to <span className="text-indigo-600">Pass Vault</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Pass Vault is a secure and easy-to-use password manager that helps you store, organize, and protect all your passwords in one place. Say goodbye to forgotten credentials and unsafe sticky notes!
          </p>
          <div className="flex gap-4">
            <Link to="/add-password">
              <button className="px-6 py-2 bg-red-600 hover:bg-red-400 hover:scale-102 text-white rounded-full transition">
                Get Started
              </button>
            </Link>
            {!user ? <Link to="/login">
              <button className="px-6 py-2 border border-[#001834] text-[#001834] hover:scale-102 hover:bg-indigo-50 rounded-full transition">
                Login
              </button>
            </Link>:<Link to="/">
              <button className="px-6 py-2 border hover:scale-102 border-red-600 text-red-600 hover:bg-red-50 rounded-full transition">
                Logout
              </button>
            </Link>}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <img
            src="/hero.svg" // <-- place this image in /public/images
            alt="Password Security Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-center text-[#001834] mb-10">
          Why Use Pass Vault?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="/vault_security.webp" alt="Secure" className="h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">Military-Grade Security</h3>
            <p className="text-gray-600 text-center">
              Your passwords are encrypted and stored safely, ensuring only you can access them.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="/secure_vault.png" alt="Easy Access" className="h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-center">
              Simple interface to add, view, and manage passwords without technical knowledge.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="/lock_password.png" alt="Sync" className="h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">Access Anywhere</h3>
            <p className="text-gray-600 text-center">
              Sync your passwords across devices and access them anywhere, anytime with peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Pass Vault. All rights reserved.
      </footer>
    </div>
  )
}

export default Home
