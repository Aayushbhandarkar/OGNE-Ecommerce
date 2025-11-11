import React from 'react';
import logo from "../assets/logo.png";
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] text-gray-700 border-t border-gray-200 transition-all duration-500">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 space-y-5"
        >
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="OGNÉ Logo" 
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              OGNÉ
            </h1>
          </div>
          <p className="text-gray-600 text-[15px] leading-relaxed max-w-md">
            OGNÉ is your modern shopping destination for curated fashion, premium products, 
            and effortless style designed to elevate your lifestyle with simplicity and class.
          </p>
          <p className="text-gray-500 italic text-sm">
            “Luxury in simplicity.”
          </p>
        </motion.div>

        {/* Company Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-semibold text-gray-900">Company</h3>
          <ul className="space-y-3 text-[15px]">
            {['Home', 'About Us', 'Collections', 'Privacy Policy'].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-semibold text-gray-900">Get in Touch</h3>
          <ul className="space-y-3 text-[15px]">
            <li className="text-gray-600">📞 +91-7767934036</li>
            <li className="text-gray-600">📧 ayushbhandarkar7@gmail.com</li>
            <li className="text-gray-600">🏬 Mumbai, India</li>
          </ul>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2025 OGNÉ — All Rights Reserved</p>
        <p className="mt-2 md:mt-0">Crafted with 🤍 for minimalists</p>
      </div>
    </footer>
  );
}

export default Footer;
