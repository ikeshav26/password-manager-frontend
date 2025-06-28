import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import passwordContext from "../context/AppContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {user,setUser}=useContext(passwordContext)
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white  transition-all fixed top-0 left-0 w-full z-50">

            <Link to='/'>
                <h1 className="text-3xl font-bold fontNew text-[#001834]">Pass Vault</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to='/' className="hover:underline">Home</Link>
                <Link to='/add-password' className="hover:underline">Add Password</Link>
                <Link to='/saved-password' className="hover:underline">Saved Passwords</Link>

                {!user ?<Link to='/login' onClick={() => setOpen(false)}>
                    <button className="cursor-pointer px-6 py-2 bg-[#001834] hover:bg-indigo-950 hover:scale-105 transition text-white rounded-full text-sm">
                        Login
                    </button>
                </Link>:<Link to='/' onClick={() => setUser(false)}>
                    <button className="cursor-pointer px-6 py-2 bg-red-600 hover:bg-red-400 hover:scale-105 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                </Link>}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpen(!open)} aria-label="Toggle Menu" className="sm:hidden">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-4 px-6 text-base sm:hidden z-10`}>
                <Link to='/' onClick={() => setOpen(false)}>Home</Link>
                <Link to='/add-password' onClick={() => setOpen(false)}>Add Password</Link>
                <Link to='/saved-password' onClick={() => setOpen(false)}>Saved Passwords</Link>
                {!user ?<Link to='/login' onClick={() => setOpen(false)}>
                    <button className="cursor-pointer px-6 py-2 bg-[#001834] hover:bg-indigo-950 hover:scale-105 transition text-white rounded-full text-sm">
                        Login
                    </button>
                </Link>:<Link to='/' onClick={() => setUser(false)}>
                    <button className="cursor-pointer px-6 py-2 bg-red-600 hover:bg-red-400 hover:scale-105 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                </Link>}
            </div>

        </nav>
    );
};

export default Navbar;
