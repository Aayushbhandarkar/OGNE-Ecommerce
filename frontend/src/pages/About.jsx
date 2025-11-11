import React from 'react';
import Title from '../component/Title';
import about from '../assets/about2.jpg';
import NewLetterBox from '../component/NewLetterBox';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] gap-[80px] pt-[100px] pb-[60px] overflow-x-hidden">

      {/* ABOUT TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      {/* ABOUT SECTION */}
      <div className="w-[90%] lg:w-[80%] flex flex-col lg:flex-row items-center justify-center gap-[50px]">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-[50%] w-[100%] flex items-center justify-center"
        >
          <img
            src={about}
            alt="About OneCart"
            className="w-[85%] lg:w-[70%] rounded-xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-[50%] w-[100%] flex flex-col items-start justify-center gap-[20px]"
        >
          <p className="text-gray-700 text-[15px] md:text-[17px] leading-relaxed">
            <span className="font-semibold text-gray-900">OGNÉ</span> was born from a passion for effortless fashion and smart shopping 
            created to deliver quality products, trending styles, and everyday essentials in one place. 
            With reliable service, fast delivery, and great value, OGNÉ makes your online shopping experience 
            simple, satisfying, and stress-free.
          </p>
          <p className="text-gray-700 text-[15px] md:text-[17px] leading-relaxed">
            We exist for modern shoppers combining style, convenience, and affordability. 
            Whether it’s fashion, lifestyle, or essentials, we bring everything you need 
            to one trusted platform with fast delivery, easy returns, and a customer-first approach.
          </p>

          <h3 className="text-[20px] md:text-[22px] font-semibold text-gray-900 mt-[10px]">Our Mission</h3>
          <p className="text-gray-700 text-[15px] md:text-[17px] leading-relaxed">
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. 
            OGNÉ connects customers with trusted products and brands, offering a seamless, 
            customer-focused experience that fits every lifestyle and need.
          </p>
        </motion.div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-[90%] flex flex-col items-center justify-center gap-[40px]"
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-[25px] py-[20px]">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="lg:w-[30%] w-[90%] h-[250px] bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center px-[25px] py-[15px] transition-all duration-500"
          >
            <b className="text-[20px] font-semibold text-gray-900 mb-3">Quality Assurance</b>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              We ensure top-notch quality through strict checks, reliable sourcing, 
              and a constant focus on customer satisfaction.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="lg:w-[30%] w-[90%] h-[250px] bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center px-[25px] py-[15px] transition-all duration-500"
          >
            <b className="text-[20px] font-semibold text-gray-900 mb-3">Convenience</b>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Shop effortlessly with quick delivery, smooth navigation, 
              and a secure, modern checkout experience.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="lg:w-[30%] w-[90%] h-[250px] bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center px-[25px] py-[15px] transition-all duration-500"
          >
            <b className="text-[20px] font-semibold text-gray-900 mb-3">Customer Experience</b>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Our support team ensures fast responses, personalized help, 
              and a smooth, joyful shopping experience every time.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* NEWSLETTER BOX */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full flex items-center justify-center mt-[30px]"
      >
        <NewLetterBox />
      </motion.div>
    </div>
  );
}

export default About;
