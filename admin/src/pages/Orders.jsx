import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si";

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)
  const [loadingOrder, setLoadingOrder] = useState(null)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  // ✅ NEW: Update Delivery Location
  const updateDeliveryLocation = async (orderId, latitude, longitude, status) => {
    if (!latitude || !longitude) {
      alert("Please enter both latitude and longitude");
      return;
    }
    try {
      setLoadingOrder(orderId)
      await axios.put(
        `${serverUrl}/api/delivery/update/${orderId}`,
        { orderId, latitude: Number(latitude), longitude: Number(longitude), status },
        { withCredentials: true }
      )
      await fetchAllOrders()
      alert("✅ Delivery location updated successfully")
    } catch (error) {
      console.log(error)
      alert("❌ Failed to update delivery location")
    } finally {
      setLoadingOrder(null)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="w-screen min-h-screen bg-[#fafafa] text-gray-900">
      <Nav />
      <div className="flex items-start justify-start">
        <Sidebar />

        <div className="w-full md:w-[82%] ml-auto mt-[90px] px-[20px] md:px-[60px] py-[40px] flex flex-col gap-[30px] transition-all duration-300">
          <h1 className="text-[32px] md:text-[40px] font-semibold text-black tracking-tight border-b border-gray-300 pb-3">
            All Orders List
          </h1>

          {orders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[30px]">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[50px] h-[50px] bg-gray-100 rounded-full flex items-center justify-center">
                        <SiEbox className="text-black w-[26px] h-[26px]" />
                      </div>
                      <p className="font-semibold text-[17px] text-gray-800">Order #{index + 1}</p>
                    </div>
                    <p className="text-[14px] text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>

                  {/* Items */}
                  <div className="text-[15px] text-gray-700 leading-relaxed">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="truncate">
                        {item.name} × {item.quantity} ({item.size})
                      </p>
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="text-[14px] text-gray-600 leading-snug border-t pt-2 mt-1">
                    <p className="font-medium text-gray-800">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}</p>
                    <p>📞 {order.address.phone}</p>
                  </div>

                  {/* Payment & Status */}
                  <div className="flex flex-col gap-2 border-t pt-2">
                    <div className="flex items-center justify-between text-[15px] text-gray-700">
                      <p>Items: {order.items.length}</p>
                      <p>Method: {order.paymentMethod}</p>
                    </div>
                    <div className="flex items-center justify-between text-[15px]">
                      <p className={`font-medium ${order.payment ? 'text-green-600' : 'text-red-500'}`}>
                        {order.payment ? 'Payment Done' : 'Payment Pending'}
                      </p>
                      <p className="font-semibold text-black">₹{order.amount}</p>
                    </div>

                    <select
                      value={order.status}
                      onChange={(e) => statusHandler(e, order._id)}
                      className="mt-3 text-[15px] border border-gray-300 rounded-md px-3 py-2 bg-white hover:border-black transition-all cursor-pointer"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  {/* ✅ NEW: Delivery Location Update Section */}
                  <div className="border-t pt-3 mt-2">
                    <h3 className="text-[15px] font-semibold text-gray-800 mb-2">Update Delivery Location</h3>
                    <div className="flex flex-col gap-2">
                      <input
                        type="number"
                        placeholder="Latitude"
                        className="border border-gray-300 rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-black"
                        id={`lat-${order._id}`}
                      />
                      <input
                        type="number"
                        placeholder="Longitude"
                        className="border border-gray-300 rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-black"
                        id={`lng-${order._id}`}
                      />
                      <button
                        onClick={() =>
                          updateDeliveryLocation(
                            order._id,
                            document.getElementById(`lat-${order._id}`).value,
                            document.getElementById(`lng-${order._id}`).value,
                            order.status
                          )
                        }
                        disabled={loadingOrder === order._id}
                        className="bg-black text-white rounded-md py-2 text-[14px] hover:bg-gray-800 transition-all"
                      >
                        {loadingOrder === order._id ? 'Updating...' : 'Update Location'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-[50px]">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
