# 🛍️ OGNÉ – AI Powered E-Commerce Platform  

**OGNÉ** is a complete **AI-powered e-commerce web application** built using the **MERN stack**.  
It provides a modern shopping experience with features like **AI product recommendations, secure payments, admin order tracking, live delivery status, and Google authentication**.  

---

## 🌐 Live Project  

| Platform | URL |
|-----------|-----|
| 🖥️ **Frontend (User Site)** | [https://ogne-ecommerce-frontend.vercel.app](https://ogne-ecommerce-frontend.vercel.app) |
| ⚙️ **Backend (API)** | [https://ogne-ecommerce-backend.onrender.com](https://ogne-ecommerce-backend.onrender.com) |
| 🧑‍💼 **Admin Panel** | [https://ogne-ecommerce-admin1.onrender.com](https://ogne-ecommerce-admin1.onrender.com) |

---

## 🖼️ Screenshots  

> A quick overview of OGNÉ’s pages and UI — clean, modern, and responsive.  

| Home Page | Collections | Product Detail |
|------------|--------------|----------------|
| ![Home](https://i.ibb.co/4PMwDgb/home.png) | ![Collection](https://i.ibb.co/kQcRRL7/product.png) | ![Product Detail](https://i.ibb.co/V33zvKb/tracking.png) |

| Cart | Checkout | Order Tracking |
|------|-----------|----------------|
| ![Cart](https://i.ibb.co/XkDmqKH/cart.png) | ![Checkout](https://i.ibb.co/nBrJ2nS/checkout.png) | ![Tracking](https://i.ibb.co/fp3VdK7/admin.png) |

| Admin Dashboard | Add Product | Analytics |
|------------------|--------------|------------|
| ![Admin Dashboard](https://i.ibb.co/2PzyN5S/dashboard.png) | ![Add Product](https://i.ibb.co/Tg6L7y8/add-product.png) | ![Analytics](https://i.ibb.co/CwMfDYG/analytics.png) |

🎥 *Demo Video Coming Soon — will include complete user + admin journey.*

---

## ⚙️ Tech Stack  

| Type | Technologies |
|------|---------------|
| **Frontend** | React.js, Tailwind CSS, Framer Motion, Axios |
| **Backend** | Node.js, Express.js, MongoDB |
| **Authentication** | JWT, Firebase (Google Login) |
| **Payments** | Razorpay |
| **Tracking** | Leaflet.js (Map + Delivery Progress) |
| **Hosting** | Render (Backend), Vercel (Frontend), MongoDB Atlas |
| **Extras** | Cloudinary, React Toastify, Chart.js |

---

## 🚀 Features  

### 👤 User Features  
- 🔐 Login / Signup with Email or Google  
- 🛍️ Browse & Add Products to Cart  
- 💳 Secure Checkout with Razorpay  
- 🧾 Order History and Real-Time Tracking  
- 🚚 Visual Delivery Stages (Packing → Shipped → Delivered)  
- 🧠 Smart Product Suggestions  
- 💬 AI-based Shopping Assistant (coming soon)  

### 🧑‍💼 Admin Features  
- 🗂️ Product Management (Add / Edit / Delete)  
- 🧾 Order Management with Live Status  
- 📊 Dashboard with Graphs & Insights  
- 🧍‍♂️ Manage Customers  
- 📦 Delivery Tracking Updates  
- 📈 Analytics and Reports  

---

## 🧩 Folder Structure  

OGNE-Ecommerce/
│
├── backend/
│ ├── config/
│ ├── controller/
│ ├── model/
│ ├── routes/
│ └── index.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ └── App.jsx
│ └── vite.config.js
│
└── admin/
├── src/
├── pages/
├── components/
└── context/


---

## ⚡ Installation  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/Aayushbhandarkar/OGNE-Ecommerce.git
cd OGNE-Ecommerce

2️⃣ Backend Setup
cd backend
npm install
npm run dev

Create a .env file inside /backend

PORT=6000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

4️⃣ Admin Setup
cd admin
npm install
npm run dev

💳 Razorpay Test Details

Use this card for testing payments during development:

Card Number: 4111 1111 1111 1111  
Expiry: Any future date  
CVV: 123  

🧭 Delivery Tracking

🚚 Stages:

Order Placed

Packing

Shipped

Out for Delivery

Delivered

📍 Visual map tracking using Leaflet.js

🔄 Auto-updates every few seconds

🧠 Dynamic movement simulation for real delivery feel

📈 Future Enhancements

🧠 AI Shopping Assistant (Chatbot)

📹 Product Videos Integration

📦 Multi-Vendor Dashboard

🛍️ Wishlist System

📧 Email Notifications (Order & Delivery updates)

🌙 Dark Mode UI

👨‍💻 Author

Ayush Bhandarkar
🎓 B.Tech Computer Engineering | MIET Bhandara
💼 MERN Stack & AI Developer
📧 ayushbhandarkar1503@gmail.com

🔗 LinkedIn
 | GitHub

🪄 Contributing

Contributions are welcome!

Fork this repository

Create a new branch

Make your changes

Submit a pull request 🚀

⭐ Support

If you like OGNÉ, don’t forget to star this repository 🌟
Your support helps me build more open-source projects!
