import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import { motion } from 'framer-motion';

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w-full lg:ml-[30px]"
    >
      {/* TITLE */}
      <div className="text-xl py-[10px] text-gray-900">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* TOTAL BOX */}
      <div className="flex flex-col gap-3 mt-3 text-[16px] bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-[25px] border border-gray-200">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-800 font-medium py-[8px]">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Shipping */}
        <div className="flex justify-between text-gray-700 py-[8px]">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between text-gray-900 text-[17px] font-semibold py-[8px]">
          <b>Total</b>
          <b>
            {currency}{' '}
            {getCartAmount() === 0
              ? 0
              : getCartAmount() + delivery_fee}
          </b>
        </div>
      </div>
    </motion.div>
  );
}

export default CartTotal;
