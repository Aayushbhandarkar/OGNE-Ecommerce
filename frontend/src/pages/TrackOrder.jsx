import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import Nav from "../component/Nav";
import Loading from "../component/Loading";
import { motion } from "framer-motion";

function TrackOrder() {
  const { orderId } = useParams();
  const { serverUrl } = useContext(authDataContext);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTracking = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/track/${orderId}`, {
        withCredentials: true,
      });
      setOrderData(result.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching tracking:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();
    const interval = setInterval(fetchTracking, 8000); // auto refresh every 8s
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#fafafa]">
        <Loading />
      </div>
    );
  }

  const currentStatus = orderData?.status || "Order Placed";

  // Step order mapping
  const steps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];

  // Get current step index
  const currentIndex = steps.findIndex(
    (step) => step.toLowerCase() === currentStatus.toLowerCase()
  );

  return (
    <div className="w-screen min-h-screen bg-[#f6f5f2] text-gray-900">
      <Nav />
      <div className="mt-[100px] flex flex-col items-center justify-start px-4">
        {/* Page Title */}
        <h2 className="text-[30px] font-semibold mb-6">Track Your Order</h2>

        {/* Order Summary */}
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 w-full max-w-[700px] mb-10">
          <p className="text-[17px] font-medium text-gray-700">
            📦 Order ID: <span className="font-semibold">{orderId}</span>
          </p>
          <p className="text-[15px] text-gray-600 mt-2">
            Destination:{" "}
            <span className="font-semibold">
              {orderData?.address?.city}, {orderData?.address?.state}
            </span>
          </p>
          <p className="text-[15px] text-gray-600 mt-1">
            Payment:{" "}
            <span className="font-semibold">{orderData?.paymentMethod}</span>
          </p>
        </div>

        {/* Order Progress Tracker */}
        <div className="relative flex items-center justify-between w-full max-w-[700px] mt-4">
          {/* Progress Line */}
          <div className="absolute top-[22px] left-[8%] w-[84%] h-[4px] bg-gray-300 rounded-full"></div>

          {/* Active Progress Line */}
          <motion.div
            className="absolute top-[22px] left-[8%] h-[4px] bg-black rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (currentIndex + 1) / steps.length }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ width: "84%" }}
          ></motion.div>

          {/* Step Circles */}
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-[20%]">
              <motion.div
                className={`w-[35px] h-[35px] rounded-full flex items-center justify-center border-2 text-[14px] font-semibold ${
                  index <= currentIndex
                    ? "bg-black border-black text-white"
                    : "bg-white border-gray-400 text-gray-400"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {index < currentIndex ? "✓" : index + 1}
              </motion.div>
              <p
                className={`text-[13px] mt-2 text-center font-medium ${
                  index <= currentIndex ? "text-black" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Status Info */}
        <div className="text-center mt-10">
          <h3 className="text-[20px] font-semibold text-black">
            {currentStatus === "Delivered"
              ? "✅ Your order has been delivered!"
              : `Current Status: ${currentStatus}`}
          </h3>
          <p className="text-[15px] text-gray-600 mt-2">
            {currentStatus === "Delivered"
              ? "Thank you for shopping with us ❤️"
              : "We'll keep you updated as your order moves forward."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
