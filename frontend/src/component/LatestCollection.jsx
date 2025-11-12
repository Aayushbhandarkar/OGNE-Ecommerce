import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { motion } from 'framer-motion';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] py-[60px] transition-all duration-500">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-[20px]"
      >
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="text-gray-600 text-[15px] md:text-[18px] mt-[10px] font-light tracking-wide">
          Step into style New arrivals dropping this season!
        </p>
      </motion.div>

      {/* ✅ Responsive Product Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="
          w-[90%] 
          grid 
          grid-cols-2           /* 📱 2 products per row on mobile */
          sm:grid-cols-2 
          md:grid-cols-3        /* 💻 3 on tablets */
          lg:grid-cols-4        /* 🖥️ 4 on larger screens */
          gap-x-[20px] 
          gap-y-[40px] 
          mt-[40px]
        "
      >
        {latestProducts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Card
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-[70%] h-[1px] bg-gray-200 mt-[60px]"
      ></motion.div>
    </div>
  );
}

export default LatestCollection;
