import React from 'react';
import { motion } from 'framer-motion';

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] py-[80px] flex flex-col items-center justify-center gap-[20px] transition-all duration-500">
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[22px] md:text-[30px] font-semibold text-gray-900 tracking-wide text-center"
      >
        Subscribe & Get <span className="underline underline-offset-4 decoration-gray-700">20% Off</span>
      </motion.p>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[14px] md:text-[17px] text-gray-600 text-center max-w-[600px] leading-relaxed px-[20px]"
      >
        Join our newsletter for exclusive offers, fashion drops, and early access to new collections — straight to your inbox.
      </motion.p>

      {/* Input Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-[15px] mt-[20px] w-[90%] md:w-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-[90%] md:w-[400px] h-[50px] rounded-full border border-gray-400 focus:border-black outline-none px-[20px] text-gray-800 text-[15px] shadow-sm focus:shadow-md transition-all duration-300"
        />
        <button
          type="submit"
          className="h-[50px] px-[30px] rounded-full bg-black text-white font-semibold text-[15px] tracking-wide hover:bg-gray-900 transition-all duration-300 shadow-md"
        >
          Subscribe
        </button>
      </motion.form>

      {/* Bottom Line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[12px] text-gray-500 mt-[15px] text-center"
      >
        By subscribing, you agree to receive marketing emails from OGNÉ.
      </motion.p>
    </div>
  );
}

export default NewLetterBox;
