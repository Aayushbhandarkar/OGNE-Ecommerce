import React, { useState, useContext, useEffect } from 'react';
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import toast from 'react-hot-toast';
import loginImage from '../assets/loginImage2.jpeg';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle Google Redirect Result
  useEffect(() => {
    async function handleRedirect() {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const user = result.user;

          await axios.post(
            serverUrl + "/api/auth/googlelogin",
            { name: user.displayName, email: user.email },
            { withCredentials: true }
          );

          await getCurrentUser();
          toast.success("Google Login Successful 🎉");
          setTimeout(() => navigate("/"), 700);
        }
      } catch (error) {
        console.log("❌ Google redirect error:", error);
      }
    }

    handleRedirect();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("Login Successful 🎉");
      setTimeout(() => navigate("/"), 700);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Google Login using Redirect
  const googlelogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log("❌ Google login redirect error:", error);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-white">

      {/* LEFT SIDE IMAGE */}
      <div className="w-1/2 h-full hidden md:flex items-center justify-center relative overflow-hidden">
        <img
          src={loginImage}
          alt="Fashion Look"
          className="w-full h-[90%] object-contain rounded-r-[30px] shadow-xl scale-100 mt-[30px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent"></div>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-8 md:px-16 bg-white">
        <div className='w-full flex items-center justify-start mb-6 cursor-pointer' onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className='w-[45px]' />
          <h1 className='text-[24px] font-semibold ml-3 text-black'>OGNÉ</h1>
        </div>

        <div className='text-center mb-10'>
          <h2 className='text-[28px] font-semibold text-gray-900'>Welcome Back</h2>
          <p className='text-gray-600 text-[15px]'>Login to continue your shopping journey</p>
        </div>

        <div className='w-full max-w-[400px]'>
          <form onSubmit={handleLogin} className='flex flex-col gap-5'>
            <div
              className='w-full h-[50px] bg-gray-100 hover:bg-gray-200 transition-all rounded-lg flex items-center justify-center gap-3 cursor-pointer border border-gray-300'
              onClick={googlelogin}
            >
              <img src={google} alt="google" className='w-[20px]' />
              <span className='text-gray-700 font-medium'>Continue with Google</span>
            </div>

            <div className='flex items-center justify-center gap-3'>
              <div className='w-[40%] h-[1px] bg-gray-300'></div>
              <span className='text-gray-500 text-sm'>or</span>
              <div className='w-[40%] h-[1px] bg-gray-300'></div>
            </div>

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
              {loading ? <Loading /> : "Login"}
            </button>

            <p className='text-center text-gray-600 text-sm mt-2'>
              Don’t have an account?
              <span
                className='text-black font-semibold cursor-pointer ml-1 hover:underline'
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
