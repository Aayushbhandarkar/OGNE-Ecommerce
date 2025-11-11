import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';
import { motion } from 'framer-motion';

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      productsCopy = productsCopy.filter((item) => currentProductId !== item._id);
      setRelated(productsCopy.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="w-full bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] py-[80px] mt-[40px] transition-all duration-500">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-[20px]"
      >
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
        <p className="text-gray-600 text-[15px] md:text-[18px] mt-[10px] font-light tracking-wide">
          Complete your look with these handpicked styles.
        </p>
      </motion.div>

      {/* Related Products */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-[90%] mx-auto mt-[40px] flex flex-wrap items-center justify-center gap-[40px]"
      >
        {related.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Card
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-[70%] h-[1px] bg-gray-200 mt-[60px] mx-auto"
      ></motion.div>
    </div>
  );
}

export default RelatedProduct;
