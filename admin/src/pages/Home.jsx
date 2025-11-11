import React, { useState, useContext, useEffect } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] text-gray-900 relative font-sans">
      {/* Navbar & Sidebar */}
      <Nav />
      <Sidebar />

      {/* Main Content */}
      <div className="w-[70vw] h-full absolute left-[25%] flex flex-col items-start justify-start gap-[50px] py-[100px] px-[40px]">
        {/* Heading */}
        <div>
          <h1 className="text-[34px] md:text-[42px] font-semibold tracking-wide text-black">
            OGNÉ Admin Dashboard
          </h1>
          <p className="text-gray-600 text-[16px] mt-2">
            Manage products, track orders, and monitor your store effortlessly.
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row items-center justify-start gap-[40px] mt-[40px]">
          {/* Products Card */}
          <div className="w-[350px] h-[200px] bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-[15px]">
            <h2 className="text-[20px] md:text-[24px] font-semibold text-gray-800">
              Total Products
            </h2>
            <div className="text-[28px] font-bold text-black tracking-wide">
              {totalProducts}
            </div>
            <p className="text-gray-500 text-[14px]">Products currently listed</p>
          </div>

          {/* Orders Card */}
          <div className="w-[350px] h-[200px] bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-[15px]">
            <h2 className="text-[20px] md:text-[24px] font-semibold text-gray-800">
              Total Orders
            </h2>
            <div className="text-[28px] font-bold text-black tracking-wide">
              {totalOrders}
            </div>
            <p className="text-gray-500 text-[14px]">Orders placed successfully</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
