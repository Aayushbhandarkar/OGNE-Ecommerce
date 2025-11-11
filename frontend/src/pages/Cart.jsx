import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';
import { motion, AnimatePresence } from 'framer-motion';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col items-center justify-start pt-[100px] pb-[80px] overflow-hidden transition-all duration-500">

      {/* TITLE */}
      <div className="text-center mb-[40px]">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* CART ITEMS */}
      <div className="w-[90%] lg:w-[80%] flex flex-col gap-[25px]">
        <AnimatePresence>
          {cartData.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center text-[18px] mt-[30px]"
            >
              Your cart is empty 🛒
            </motion.p>
          )}

          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 flex flex-col md:flex-row items-center justify-between p-[20px] gap-[20px] transition-all duration-300"
              >
                {/* PRODUCT IMAGE */}
                <div className="flex items-center justify-start gap-[20px] w-full md:w-[50%]">
                  <img
                    src={productData.image1}
                    alt={productData.name}
                    className="w-[100px] h-[100px] rounded-xl object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-[18px] md:text-[20px] text-gray-900 font-medium line-clamp-2">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-[15px] mt-[5px]">
                      <p className="text-[16px] text-gray-700 font-semibold">
                        {currency} {productData.price}
                      </p>
                      <span className="text-[14px] text-gray-600 border border-gray-300 rounded-md px-2 py-[2px] bg-gray-50">
                        Size: {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QUANTITY INPUT */}
                <div className="flex items-center justify-center gap-[15px]">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="w-[60px] text-center py-[6px] rounded-lg border border-gray-300 bg-gray-50 text-[16px] text-gray-800 font-semibold focus:outline-none focus:border-gray-600"
                    onChange={(e) =>
                      (e.target.value === ' ' || e.target.value === '0')
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                  />

                  {/* DELETE ICON */}
                  <RiDeleteBin6Line
                    className="text-gray-500 hover:text-red-500 w-[22px] h-[22px] cursor-pointer transition-all duration-300"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* CART TOTAL + BUTTON */}
      <div className="w-[90%] lg:w-[80%] mt-[60px] flex flex-col items-end gap-[20px]">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-black text-white py-[12px] rounded-xl mt-[20px] text-[16px] font-semibold tracking-wide hover:bg-gray-800 transition-all duration-300 shadow-md"
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
