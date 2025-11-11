import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    items: {
          type:Array,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
    address: {
        type:Object,
        required: true
    },
    destination: {
  type: Object,
  required: false
},

    status: {
        type:String,
        required: true,
        default:'Order Placed'
    },
    paymentMethod: {
        type:String,
        required: true
    },
    payment: {
        type:Boolean,
        required: true,
        default:false
    },
    date: {
        type: Number,
        required:true
    },

    latitude: {
    type: Number,
    default: null
},
longitude: {
    type: Number,
    default: null
},

},{timestamps:true}) 

const Order = mongoose.model('Order' , orderSchema)

export default Order