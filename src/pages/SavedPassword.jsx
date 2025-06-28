import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SavedPassword = () => {
  const [mockPasswords, setmockPasswords] = useState([]);
  const [deletingId, setDeletingId] = useState(null); 

  useEffect(() => {
  const fetchPasswords = async () => {
    try {
      const res = await axios.get("https://password-manager-backend-r8k1.onrender.com/api/password/get-passwords", {
        withCredentials: true
      });

      
      if (res.data.passwords && res.data.passwords.length > 0) {
        setmockPasswords(res.data.passwords);
        toast.success("Passwords fetched successfully!");
      } else {
        setmockPasswords([]);
        toast("No passwords saved yet.");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {

        setmockPasswords([]);
        toast("No passwords saved yet.");
      } else {
        console.error("Error fetching passwords:", err);
        toast.error("Failed to fetch passwords. Please try again.");
      }
    }
  };

  fetchPasswords();
}, []);


  const copyHandler = (e) => {
    const password = e.target.previousElementSibling.value;
    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success("Password copied to clipboard!");
      });
  };

  const deleteHandler = async (item) => {
    setDeletingId(item._id); // start loading

    try {
      const res = await axios.delete("https://password-manager-backend-r8k1.onrender.com/api/password/delete-password", {
        data: {
          title: item.title,
          username: item.username,
          email: item.email,
          id: item._id
        },
        withCredentials: true
      });

      // Update UI to remove deleted password
      setmockPasswords(prev => prev.filter(p => p._id !== item._id));
      toast.success("Password deleted successfully!");
    } catch (error) {
      console.error("Error deleting password:", error);
      toast.error("Failed to delete password. Please try again.");
    } finally {
      setDeletingId(null); // stop loading
    }
  };

  return (
    <div className='bg-white text-black w-full min-h-screen pt-24 px-4 md:px-20'>
      <h2 className='text-2xl font-bold text-[#001834] mb-6'>Your Saved Passwords</h2>

      {mockPasswords.length === 0 ? (
        <p className='text-gray-600 mt-6'>No passwords saved yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
          {mockPasswords.map((item) => (
            <div key={item._id} className='bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition'>
              <h3 className='text-xl font-semibold text-[#001834]'>{item.title}</h3>

              <div>
                <p className='text-sm text-gray-500'>Username</p>
                <p className='text-base'>{item.username}</p>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Email</p>
                <p className='text-base'>{item.email}</p>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Password</p>
                <div className='flex items-center gap-2'>
                  <input
                    type="password"
                    value={item.password}
                    readOnly
                    className='bg-white border border-gray-300 rounded px-3 py-1 text-base w-full outline-none'
                  />
                  <button
                    onClick={copyHandler}
                    className='text-sm cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition'
                  >
                    Copy
                  </button>
                </div>
              </div>

              <button
                onClick={() => deleteHandler(item)}
                disabled={deletingId === item._id}
                className={`mt-2 text-sm self-end ${
                  deletingId === item._id
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-red-500 hover:underline'
                }`}
              >
                {deletingId === item._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPassword;
