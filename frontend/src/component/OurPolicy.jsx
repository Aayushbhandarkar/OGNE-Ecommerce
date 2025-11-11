import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { motion } from 'framer-motion';

function OurPolicy() {
  return (
    <div className="w-screen min-h-[80vh] flex flex-col items-center justify-start bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] py-[80px] transition-all duration-500">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-[40px]"
      >
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="text-gray-600 text-[15px] md:text-[18px] mt-[10px] font-light tracking-wide max-w-[700px] mx-auto">
          Customer-friendly policies — designed for your comfort, satisfaction, and peace of mind.
        </p>
      </motion.div>

      {/* Policies Section */}
      <div className="w-[90%] flex flex-wrap items-center justify-center gap-[60px] lg:gap-[100px] mt-[30px]">
        {/* Policy 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-[350px] max-w-[90%] flex flex-col items-center justify-center text-center p-[25px] rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <RiExchangeFundsLine className="text-black w-[50px] h-[50px] md:w-[65px] md:h-[65px]" />
          <h3 className="font-semibold text-[20px] md:text-[22px] text-gray-900 mt-[10px]">
            Easy Exchange Policy
          </h3>
          <p className="text-gray-600 text-[14px] md:text-[16px] leading-relaxed mt-[8px]">
            Exchange made simple — quick, transparent, and customer-first approach.
          </p>
        </motion.div>

        {/* Policy 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-[350px] max-w-[90%] flex flex-col items-center justify-center text-center p-[25px] rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <TbRosetteDiscountCheckFilled className="text-black w-[50px] h-[50px] md:w-[65px] md:h-[65px]" />
          <h3 className="font-semibold text-[20px] md:text-[22px] text-gray-900 mt-[10px]">
            7 Days Return Policy
          </h3>
          <p className="text-gray-600 text-[14px] md:text-[16px] leading-relaxed mt-[8px]">
            Shop with confidence — easy 7-day return and hassle-free refunds.
          </p>
        </motion.div>

        {/* Policy 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-[350px] max-w-[90%] flex flex-col items-center justify-center text-center p-[25px] rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <BiSupport className="text-black w-[50px] h-[50px] md:w-[65px] md:h-[65px]" />
          <h3 className="font-semibold text-[20px] md:text-[22px] text-gray-900 mt-[10px]">
            Best Customer Support
          </h3>
          <p className="text-gray-600 text-[14px] md:text-[16px] leading-relaxed mt-[8px]">
            Our support team ensures quick responses and a premium experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default OurPolicy;
