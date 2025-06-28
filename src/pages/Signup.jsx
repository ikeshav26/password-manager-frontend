import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import passwordContext from "../context/AppContext";

const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { user, setUser, navigate } = useContext(passwordContext);
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    const formData = {
      username,
      email,
      password,
    };
    setemail("");
    setpassword("");
    setusername("");

    axios
      .post("http://localhost:3000/api/user/signup", formData, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(true);
        setloading(false);
        toast.success("Signup successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        setloading(false);
        toast.error("An error occurred during signup. Please try again.");
      });
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="w-full hidden md:inline-block">
        <img className="h-full" src="/bg.jpg" alt="leftSideImage" />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome! Please sign up to continue
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-8">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                fill="#6B7280"
                d="M8 1.333a3.333 3.333 0 100 6.667 3.333 3.333 0 000-6.667zM5.333 4.667a2.667 2.667 0 115.334 0 2.667 2.667 0 01-5.334 0zm-4 9.333c0-2.21 3.134-3.333 6.667-3.333s6.667 1.123 6.667 3.333v.667H1.333v-.667zm1.608-.058c.305-1.037 2.358-1.942 5.059-1.942s4.754.905 5.06 1.942H2.941z"
              />
            </svg>

            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              placeholder="Username"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-8">
            <svg width="16" height="11" fill="none" viewBox="0 0 16 11">
              <path
                fill="#6B7280"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              />
            </svg>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="13" height="17" fill="none" viewBox="0 0 13 17">
              <path
                fill="#6B7280"
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              />
            </svg>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          {/* ✅ Loading-enabled button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-8 w-full h-11 rounded-full text-white transition-opacity ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#001834] hover:opacity-90"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#001834] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
