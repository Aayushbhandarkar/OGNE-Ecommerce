import React from 'react';
import LatestCollection from '../component/LatestCollection';
import BestSeller from '../component/BestSeller';
import { motion } from 'framer-motion';

function Product() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col items-center justify-start py-[60px] gap-[80px] transition-all duration-500 overflow-x-hidden">

      {/* LATEST COLLECTION SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="w-full flex items-center justify-center flex-col gap-[30px] px-[20px]"
      >
        <LatestCollection />
      </motion.div>

      {/* BEST SELLER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full flex items-center justify-center flex-col gap-[30px] px-[20px]"
      >
        <BestSeller />
      </motion.div>

    </div>
  );
}

export default Product;
