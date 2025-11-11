import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  let [products, setProducts] = useState([])
  let [search, setSearch] = useState('')
  let { userData } = useContext(userDataContext)
  let [showSearch, setShowSearch] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let [cartItem, setCartItem] = useState({})
  let [loading, setLoading] = useState(false)
  let currency = '₹'
  let delivery_fee = 40

  // ✅ Get All Products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data)
    } catch (error) {
      console.log("Product Fetch Error:", error)
    }
  }

  // ✅ Add to Cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size")
      return
    }

    let cartData = structuredClone(cartItem)

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    setCartItem(cartData)

    if (userData) {
      setLoading(true)
      try {
        const result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        )
        toast.success("Product Added to Cart")
      } catch (error) {
        console.log("Add to Cart Error:", error)
        toast.error("Add to Cart Failed")
      } finally {
        setLoading(false)
      }
    }
  }

  // ✅ Get User Cart (FIXED)
  const getUserCart = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/cart/get', {
        withCredentials: true,
      })
      setCartItem(result.data)
    } catch (error) {
      console.log("Get Cart Error:", error)
    }
  }

  // ✅ Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        )
      } catch (error) {
        console.log("Update Quantity Error:", error)
      }
    }
  }

  // ✅ Get Cart Item Count
  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item]
        }
      }
    }
    return totalCount
  }

  // ✅ Get Total Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      const itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) continue
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalAmount += itemInfo.price * cartItem[items][item]
        }
      }
    }
    return totalAmount
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (userData) getUserCart()
  }, [userData])

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    loading,
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
