import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { motion } from 'framer-motion';

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] py-[60px] transition-all duration-500">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-[20px]"
      >
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="text-gray-600 text-[15px] md:text-[18px] mt-[10px] font-light tracking-wide">
          Tried, tested, loved — discover our most wanted products.
        </p>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="
          w-[90%] 
          grid 
          grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[40px] 
          mt-[40px]
        "
      >
        {bestSeller.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Card
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image1}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Divider for clean section separation */}
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

export default BestSeller;
