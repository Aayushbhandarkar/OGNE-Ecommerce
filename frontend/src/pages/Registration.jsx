import React, { useState, useContext } from 'react';
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import loginImage from '../assets/loginImage2.jpeg'; 

function Registration() {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name,
        email,
        password
      }, { withCredentials: true });
      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true });
      console.log(result.data);
      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-white">
      {/* LEFT SIDE IMAGE */}
      <div className="w-1/2 h-full hidden md:flex items-center justify-center relative overflow-hidden">
        <img
          src={loginImage}
          alt="Fashion"
          className="w-full h-[90%] object-contain rounded-r-[30px] shadow-xl scale-100 mt-[30px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent"></div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-8 md:px-16 bg-white">
        {/* Logo */}
        <div className='w-full flex items-center justify-start mb-6 cursor-pointer' onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className='w-[45px]' />
          <h1 className='text-[24px] font-semibold ml-3 text-black'>OGNÉ</h1>
        </div>

        <div className='text-center mb-10'>
          <h2 className='text-[28px] font-semibold text-gray-900'>Create Your Account</h2>
          <p className='text-gray-600 text-[15px]'>Join OGNÉ and start shopping with style</p>
        </div>

        {/* Form */}
        <div className='w-full max-w-[400px]'>
          <form onSubmit={handleSignup} className='flex flex-col gap-5'>
            <div
              className='w-full h-[50px] bg-gray-100 hover:bg-gray-200 transition-all rounded-lg flex items-center justify-center gap-3 cursor-pointer border border-gray-300'
              onClick={googleSignup}
            >
              <img src={google} alt="google" className='w-[20px]' />
              <span className='text-gray-700 font-medium'>Sign up with Google</span>
            </div>

            <div className='flex items-center justify-center gap-3'>
              <div className='w-[40%] h-[1px] bg-gray-300'></div>
              <span className='text-gray-500 text-sm'>or</span>
              <div className='w-[40%] h-[1px] bg-gray-300'></div>
            </div>

            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full h-[50px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 bg-gray-50 text-gray-900'
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full h-[50px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 bg-gray-50 text-gray-900'
            />

            <div className='relative w-full'>
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full h-[50px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 bg-gray-50 text-gray-900'
              />
              {show ? (
                <IoEye
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer'
                  onClick={() => setShow(false)}
                />
              ) : (
                <IoEyeOutline
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer'
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            <button
              type="submit"
              className='w-full h-[50px] bg-black text-white font-semibold rounded-lg hover:opacity-90 transition-all mt-2'
            >
              {loading ? <Loading /> : "Create Account"}
            </button>

            <p className='text-center text-gray-600 text-sm mt-2'>
              Already have an account?
              <span
                className='text-black font-semibold cursor-pointer ml-1 hover:underline'
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
