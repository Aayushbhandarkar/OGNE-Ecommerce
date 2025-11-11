import React from 'react';
import { motion } from 'framer-motion';

function Loading() {
  return (
    <div className="flex items-center justify-center">
      {/* Outer Circle */}
      <motion.div
        className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
      ></motion.div>
    </div>
  );
}

export default Loading;
