import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => navigate(`/productdetail/${id}`)}
      className="
        w-full 
        sm:max-w-[260px] 
        md:max-w-[280px] 
        lg:max-w-[300px] 
        bg-white rounded-xl overflow-hidden 
        shadow-sm hover:shadow-xl border border-gray-200 
        cursor-pointer group transition-all duration-500
      "
    >
      {/* Product Image */}
      <div
        className="
          w-full 
          h-[200px]      /* 👈 smaller height for mobile */
          sm:h-[250px] 
          md:h-[340px] 
          lg:h-[360px] 
          overflow-hidden bg-[#f5f5f5] relative
        "
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Quick View text */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/80 py-2 text-gray-800 text-sm font-medium tracking-wide">
          VIEW DETAILS
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col items-start justify-start text-left">
        <h3 className="text-gray-800 text-[15px] font-medium mb-2 line-clamp-2 tracking-wide group-hover:text-black transition-colors duration-300">
          {name}
        </h3>

        <div className="flex items-center justify-between w-full">
          <span className="text-gray-900 text-[18px] font-semibold">
            {currency} {price}
          </span>
          <span className="text-gray-600 text-[12px] font-medium bg-gray-100 px-2 py-[2px] rounded-md">
            30% OFF
          </span>
        </div>

        <div className="mt-2 text-gray-500 text-[12px]">
          <span className="line-through mr-2">
            {currency} {Math.round(price * 1.3)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
