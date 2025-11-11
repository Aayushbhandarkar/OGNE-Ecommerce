import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import deliveryRoutes from './routes/deliveryRoutes.js'

dotenv.config()

let port = process.env.PORT || 6000
let app = express()

// ✅ Middlewares
app.use(express.json())
app.use(cookieParser())

// ✅ Updated CORS setup
app.use(cors({
  origin: [
    "https://ogne-ecommerce-frontend.onrender.com", // frontend
    "https://ogne-ecommerce-admin1.onrender.com",   // admin panel
    "http://localhost:5173"                         // local dev frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // very important for cookies/JWT
}))

// ✅ API routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/delivery", deliveryRoutes)

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`)
  connectDb()
})

// ✅ Just a helper log
console.log("Cloudinary ENV Check:", {
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Present ✅" : "Missing ❌",
});
