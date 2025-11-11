import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import razorpay from '../assets/Razorpay.jpg';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { motion } from 'framer-motion';

function PlaceOrder() {
  let [method, setMethod] = useState('cod');
  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
        if (data) {
          navigate('/order');
          setCartItem({});
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + '/api/order/placeorder', orderData, { withCredentials: true });
          if (result.data) {
            setCartItem({});
            toast.success('Order Placed Successfully');
            navigate('/order');
          } else {
            toast.error('Order Placement Failed');
          }
          setLoading(false);
          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true });
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
            toast.success('Payment Initiated');
          }
          setLoading(false);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col md:flex-row items-start justify-center gap-[40px] pt-[100px] pb-[80px] transition-all duration-500">
      
      {/* LEFT: FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-[50%] w-[95%] flex flex-col items-center justify-center"
      >
        <form
          onSubmit={onSubmitHandler}
          className="w-[100%] max-w-[550px] bg-white p-[30px] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]">
            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={onChangeHandler} required className="input-style" />
            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={onChangeHandler} required className="input-style" />
          </div>

          <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChangeHandler} required className="input-style mt-[20px]" />
          <input type="text" placeholder="Street" name="street" value={formData.street} onChange={onChangeHandler} required className="input-style mt-[20px]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]">
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={onChangeHandler} required className="input-style" />
            <input type="text" placeholder="State" name="state" value={formData.state} onChange={onChangeHandler} required className="input-style" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]">
            <input type="text" placeholder="Pincode" name="pinCode" value={formData.pinCode} onChange={onChangeHandler} required className="input-style" />
            <input type="text" placeholder="Country" name="country" value={formData.country} onChange={onChangeHandler} required className="input-style" />
          </div>

          <input type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={onChangeHandler} required className="input-style mt-[20px]" />

          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full mt-[30px] bg-black text-white py-[12px] rounded-lg font-semibold tracking-wide text-[16px] hover:bg-gray-900 transition-all duration-300 shadow-md"
          >
            {loading ? <Loading /> : 'PLACE ORDER'}
          </motion.button>
        </form>
      </motion.div>

      {/* RIGHT: CART TOTAL + PAYMENT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-[45%] w-[95%] flex flex-col items-center justify-start gap-[30px]"
      >
        <CartTotal />

        <div className="text-center mt-[10px]">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>

        <div className="w-full flex items-center justify-center gap-[30px] mt-[20px] flex-wrap">
          <button
            onClick={() => setMethod('razorpay')}
            className={`w-[160px] h-[60px] border-2 rounded-xl overflow-hidden ${method === 'razorpay' ? 'border-black' : 'border-gray-300'} transition-all duration-300`}
          >
            <img src={razorpay} alt="Razorpay" className="w-full h-full object-cover" />
          </button>

          <button
            onClick={() => setMethod('cod')}
            className={`w-[200px] h-[60px] rounded-xl font-semibold text-[14px] border-2 transition-all duration-300 ${
              method === 'cod'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-800 hover:border-black'
            }`}
          >
            CASH ON DELIVERY
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PlaceOrder;
