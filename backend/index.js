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

const app = express()
const port = process.env.PORT || 6000

// ✅ Middleware
app.use(express.json())
app.use(cookieParser())

// ✅ CORS Config (Render + Local + Admin)
app.use(cors({
  origin: [
    "https://ogne-ecommerce-frontend.onrender.com", // Render frontend
    "https://ogne-ecommerce-admin1.onrender.com",   // Admin panel
    "https://ogne-ecommerce-frontend-erfpfqo8w-ayush-bhandarkars-projects.vercel.app", // ✅ New Vercel frontend
    "http://localhost:5173"                         // Local development
  ],
  credentials: true, // important for JWT cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// ✅ Fix for preflight OPTIONS request (CORS)
app.options('*', cors())

// ✅ Main Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/delivery", deliveryRoutes)

// ✅ Server Start
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
  connectDb()
})

// ✅ Cloudinary sanity check
console.log("🌩️ Cloudinary ENV Check:", {
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Present ✅" : "Missing ❌",
})
