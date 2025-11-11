import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const AdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true });
      console.log(result.data);
      toast.success("Admin Login Successful");
      getAdmin();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Admin Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col items-center justify-center text-gray-900">
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-3 absolute top-[40px] cursor-pointer">
        <img src={logo} alt="logo" className="w-[45px] h-[45px]" />
        <h1 className="text-[26px] font-bold tracking-wide text-gray-800">OGNÉ ADMIN</h1>
      </div>

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] max-w-[420px] bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-[30px] border border-gray-200 flex flex-col items-center justify-center"
      >
        <h2 className="text-[28px] font-semibold mb-1 text-gray-900">Admin Login</h2>
        <p className="text-gray-500 text-[15px] mb-6">Welcome back! Please enter your credentials.</p>

        <form onSubmit={AdminLogin} className="w-full flex flex-col gap-[20px]">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] border border-gray-300 rounded-lg px-[15px] text-[16px] text-gray-800 focus:outline-none focus:border-black bg-gray-50"
            />
          </div>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] border border-gray-300 rounded-lg px-[15px] text-[16px] text-gray-800 focus:outline-none focus:border-black bg-gray-50"
            />
            {show ? (
              <IoEye
                className="absolute right-[15px] top-[15px] text-gray-600 cursor-pointer"
                onClick={() => setShow(false)}
              />
            ) : (
              <IoEyeOutline
                className="absolute right-[15px] top-[15px] text-gray-600 cursor-pointer"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[50px] bg-black text-white font-semibold text-[17px] rounded-lg hover:opacity-90 transition-all duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </motion.div>

      {/* Footer Text */}
      <p className="text-gray-500 text-[13px] mt-[20px] tracking-wide">
        © 2025 OGNÉ Admin Panel. All rights reserved.
      </p>
    </div>
  );
}

export default Login;
