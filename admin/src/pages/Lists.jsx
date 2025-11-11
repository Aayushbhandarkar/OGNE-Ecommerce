import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()
      } else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-screen min-h-screen bg-[#fafafa] text-gray-800 overflow-x-hidden">
      <Nav />
      <div className="flex items-start justify-start">
        <Sidebar />

        <div className="w-full md:w-[82%] ml-auto mt-[90px] px-[20px] md:px-[60px] py-[40px] flex flex-col gap-[30px] transition-all duration-300">
          <h1 className="text-[32px] md:text-[40px] font-semibold text-black tracking-tight border-b border-gray-300 pb-3">
            All Listed Products
          </h1>

          {list?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[25px] mt-5">
              {list.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between"
                >
                  <div className="w-full h-[250px] bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-[18px] font-semibold text-gray-900 truncate">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-[15px]">{item.category}</p>
                    <p className="text-black text-[17px] font-medium mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeList(item._id)}
                    className="mt-4 text-[14px] text-white bg-black py-2 rounded-md hover:bg-gray-900 transition-all duration-300"
                  >
                    Remove Product
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-[50px]">
              No products available.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lists
