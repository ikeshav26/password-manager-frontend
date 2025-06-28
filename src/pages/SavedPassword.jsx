import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SavedPassword = () => {
  const [mockPasswords, setmockPasswords] = useState([]);
  const [deletePass, setdeletePass] = useState(null);

  
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/password/get-passwords", {
          withCredentials: true
        });
        setmockPasswords(res.data.passwords);
        toast.success("Passwords fetched successfully!");
      } catch (err) {
        console.error("Error fetching passwords:", err);
        toast.error("Failed to fetch passwords. Please try again.");
      }
    };
    fetchPasswords();
  }, []);

  
  const copyHandler = (e) => {
    const password = e.target.previousElementSibling.value;
    navigator.clipboard.writeText(password)
      .then(() => toast.success("Password copied to clipboard!"));
  };


  const deleteHandler = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/api/password/delete-password", {
        data: {
          title: deletePass.title,
          username: deletePass.username,
          email: deletePass.email,
          id: deletePass.id
        },
        withCredentials: true
      });

      
      setmockPasswords(prev => prev.filter(p => p._id !== deletePass.id));
      toast.success(`Deleted: ${deletePass.title}`);
      setdeletePass(null);
    } catch (error) {
      console.error("Error deleting password:", error);
      toast.error("Failed to delete password.");
    }
  };

  
  const triggerDelete = (item) => {
    setdeletePass({
      title: item.title,
      username: item.username,
      email: item.email,
      id: item._id
    });

    toast((t) => (
      <span>
        Delete <strong>{item.title}</strong>?
        <button
          onClick={() => {
            deleteHandler();
            toast.dismiss(t.id);
          }}
          className="ml-2 bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Confirm
        </button>
        <button
          onClick={() => {
            setdeletePass(null);
            toast.dismiss(t.id);
          }}
          className="ml-2 bg-gray-200 text-black px-3 py-1 rounded text-sm"
        >
          Cancel
        </button>
      </span>
    ), {
      duration: 5000,
      style: {
        border: '1px solid #ccc',
        padding: '12px',
        borderRadius: '10px'
      }
    });
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
                onClick={() => triggerDelete(item)}
                className='mt-2 text-sm text-red-500 hover:underline self-end'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPassword;
