import React from 'react';
import Title from '../component/Title';
import contact from "../assets/contact3.jpg";
import NewLetterBox from '../component/NewLetterBox';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] pt-[100px] pb-[80px] transition-all duration-500">
      {/* PAGE TITLE */}
      <Title text1={'CONTACT'} text2={'US'} />

      {/* MAIN CONTENT */}
      <div className="w-[90%] lg:w-[80%] flex flex-col lg:flex-row items-center justify-center mt-[40px] gap-[60px]">
        {/* LEFT: IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-[50%] w-[100%] flex items-center justify-center"
        >
          <img
            src={contact}
            alt="Contact Us"
            className="lg:w-[75%] w-[85%] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 object-cover"
          />
        </motion.div>

        {/* RIGHT: INFO */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-[45%] w-[90%] flex flex-col items-start justify-start gap-[15px] text-gray-800"
        >
          <p className="text-[18px] md:text-[20px] font-semibold text-gray-900">
            Our Store
          </p>
          <div className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed">
            <p>12345 Random Station</p>
            <p>Mumbai City, Maharastra, India</p>
          </div>

          <div className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed mt-[10px]">
            <p>📞 +91 7767934036</p>
            <p>📧 ayushbhandarkar7@gmail.com</p>
          </div>

          <p className="text-[18px] md:text-[20px] font-semibold text-gray-900 mt-[20px]">
            Careers at OGNÉ
          </p>
          <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed">
            Learn more about our team and open positions.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-[15px] px-[35px] py-[12px] bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-900 transition-all duration-300 shadow-md"
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </div>

      {/* NEWSLETTER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-[80px] w-full flex items-center justify-center"
      >
        <NewLetterBox />
      </motion.div>
    </div>
  );
}

export default Contact;
