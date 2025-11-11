import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ✅ Added

function Order() {
  let [orderData, setOrderData] = useState([]);
  let { currency } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate(); // ✅ Added

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true });
      if (result.data) {
        let allOrdersItem = [];
        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id; // ✅ Added to access orderId later
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] py-[100px] flex flex-col items-center transition-all duration-500">
      {/* PAGE TITLE */}
      <div className="text-center mb-[40px]">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* ORDER LIST */}
      <div className="w-[90%] lg:w-[80%] flex flex-col gap-[25px]">
        <AnimatePresence>
          {orderData.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center text-[18px] mt-[30px]"
            >
              You haven’t placed any orders yet 🛍️
            </motion.p>
          )}

          {orderData.map((item, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 p-[20px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[20px]"
            >
              {/* Product Info */}
              <div className="flex items-center gap-[20px] w-full md:w-[60%]">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="text-gray-900 text-[18px] md:text-[20px] font-medium line-clamp-2">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-[15px] text-gray-700 text-[14px] mt-[5px]">
                    <span>{currency} {item.price}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col items-start md:items-end justify-between w-full md:w-[35%] gap-[10px] text-[14px] text-gray-600">
                <div className="flex items-center gap-2">
                  <p className="text-gray-700">Date:</p>
                  <span className="text-gray-800 font-medium">{new Date(item.date).toDateString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-700">Payment:</p>
                  <span className="font-medium">{item.paymentMethod}</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === 'Delivered'
                        ? 'bg-green-500'
                        : item.status === 'Pending'
                        ? 'bg-yellow-400'
                        : 'bg-gray-400'
                    }`}
                  ></div>
                  <span
                    className={`text-[14px] font-semibold ${
                      item.status === 'Delivered'
                        ? 'text-green-600'
                        : item.status === 'Pending'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* ✅ Track Order Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/trackorder/${item.orderId}`)} // ✅ Updated to navigate to tracking page
                  className="px-[20px] py-[8px] mt-[5px] rounded-lg bg-black text-white text-[13px] font-semibold hover:bg-gray-900 transition-all duration-300 shadow-sm"
                >
                  TRACK ORDER
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Order;
