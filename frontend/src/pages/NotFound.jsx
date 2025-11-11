import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col items-center justify-center text-center px-6 transition-all duration-500">
      {/* Animated 404 */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-[90px] md:text-[150px] font-bold text-gray-900 leading-none"
      >
        404
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[18px] md:text-[22px] text-gray-600 mt-4"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/login')}
        className="mt-8 px-[40px] py-[12px] bg-black text-white text-[16px] md:text-[18px] font-semibold rounded-full shadow-md hover:bg-gray-900 transition-all duration-300"
      >
        Back to Login
      </motion.button>

      {/* Small subtle message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="text-gray-400 text-[14px] mt-[30px]"
      >
        © 2025 OGNÉ | Designed with minimalism
      </motion.p>
    </div>
  );
}

export default NotFound;
