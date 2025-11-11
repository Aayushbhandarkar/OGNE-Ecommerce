import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay';
import dotenv from 'dotenv';
import axios from "axios";  // ✅ Added for geocoding
dotenv.config();

const currency = 'inr';
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// for User
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    // ✅ STEP 1: Default destination (in case city lookup fails)
    let lat = 19.0760; // Mumbai default
    let lon = 72.8777;

    // ✅ STEP 2: Try to get city coordinates using OpenStreetMap API
    try {
      if (address?.city) {
        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/search?city=${address.city}&format=json&limit=1`
        );
        if (geoRes.data.length > 0) {
          lat = parseFloat(geoRes.data[0].lat);
          lon = parseFloat(geoRes.data[0].lon);
        }
      }
    } catch (geoErr) {
      console.log("Geocoding failed:", geoErr.message);
    }

    // ✅ STEP 3: Include destination coordinates
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      destination: { latitude: lat, longitude: lon }, // ✅ new field
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: "Order Place" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order Place error" });
  }
};



export const placeOrderRazorpay = async (req,res) => {
    try {
        
         const {items , amount , address} = req.body;
         const userId = req.userId;
         const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
         }

         const newOrder = new Order(orderData)
         await newOrder.save()

         const options = {
            amount:amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
         }
         await razorpayInstance.orders.create(options, (error,order)=>{
            if(error) {
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json(order)
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message
            })
    }
}


export const verifyRazorpay = async (req,res) =>{
    try {
        const userId = req.userId
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId , {cartData:{}})
            res.status(200).json({message:'Payment Successful'
            })
        }
        else{
            res.json({message:'Payment Failed'
            })
        }
    } catch (error) {
        console.log(error)
         res.status(500).json({message:error.message
            })
    }
}






export const userOrders = async (req,res) => {
      try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders error"})
    }
    
}




//for Admin



    
export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
        
    }
    
}
    
export const updateStatus = async (req,res) => {
    
try {
    const {orderId , status} = req.body

    await Order.findByIdAndUpdate(orderId , { status })
    return res.status(201).json({message:'Status Updated'})
} catch (error) {
     return res.status(500).json({message:error.message
            })
}
}

// ✅ Track specific order by ID
// ✅ Track specific order by ID
// 🗺️ Get order tracking details
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // 🔹 Simulate destination using address (city → coordinate mapping)
    let destination = { latitude: 19.1560, longitude: 72.9577 }; // default Virar

    if (order.address.city?.toLowerCase().includes("nagpur")) {
      destination = { latitude: 21.1458, longitude: 79.0882 };
    } else if (order.address.city?.toLowerCase().includes("pune")) {
      destination = { latitude: 18.5204, longitude: 73.8567 };
    } else if (order.address.city?.toLowerCase().includes("delhi")) {
      destination = { latitude: 28.6139, longitude: 77.209 };
    }

    res.status(200).json({
      status: order.status,
      address: order.address,
      destination,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Tracking error" });
  }
};

