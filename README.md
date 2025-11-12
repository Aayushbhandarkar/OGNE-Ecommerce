# 🛍️ OGNÉ – AI Powered E-Commerce Platform  

**OGNÉ** is a complete **AI-powered e-commerce web application** built using the **MERN stack**.  
It provides a modern shopping experience with features like **AI product recommendations, secure payments, admin order tracking, live delivery status, and Google authentication**.  

---

## 🌐 Live Project  

| Platform | URL |
|-----------|-----|
| 🖥️ **Frontend (User Site)** | [https://ogne-ecommerce-frontend.vercel.app](https://ogne-ecommerce-frontend.onrender.com) |
| ⚙️ **Backend (API)** | [https://ogne-ecommerce-backend.onrender.com](https://ogne-ecommerce-backend.onrender.com) |
| 🧑‍💼 **Admin Panel** | [https://ogne-ecommerce-admin1.onrender.com](https://ogne-ecommerce-admin1.onrender.com) |

---

## 🖼️ Screenshots  



> A quick overview of OGNÉ’s pages and UI — clean, modern, and responsive.  

### 🔐 Login Page  
<img width="1919" height="1050" alt="Login Page" src="https://github.com/user-attachments/assets/c6bf1dfc-b13e-4a6a-b33f-de0c84639e2b" />

---

### 🏠 Main Website Pages  

| 🏡 Home Page | 🛍️ Collections | 👗 Product Detail |
|--------------|----------------|------------------|
| <img width="1919" height="1051" alt="Home" src="https://github.com/user-attachments/assets/6df928b6-2ffe-480b-b270-d525d144fe2a" /> | <img width="1919" height="1046" alt="Collections" src="https://github.com/user-attachments/assets/df4def1e-26f3-4404-abf8-3dff3bdbf4b5" /> | <img width="1895" height="1033" alt="Product Detail" src="https://github.com/user-attachments/assets/5c31690e-1b8b-448b-a4ec-560c5c27bd66" /> |

---

### 🛒 Shopping Flow  

| 🧺 Cart | 💳 Checkout | 🚚 Order Tracking |
|---------|-------------|------------------|
| <img width="1905" height="1020" alt="Cart" src="https://github.com/user-attachments/assets/5bdd986b-6353-485f-873c-84379431d510" /> | <img width="1899" height="1026" alt="Checkout" src="https://github.com/user-attachments/assets/2b941be9-bde0-46ea-9fcf-d7034a22e2b8" /> | <img width="1919" height="1047" alt="Screenshot 2025-11-10 123700" src="https://github.com/user-attachments/assets/88917ee9-44b6-4fb5-9050-c39d19dd8369" />|

---

### 🧑‍💼 Admin Dashboard  

| 📊 Dashboard | ➕ Add Product | 📈 Analytics |
|--------------|----------------|--------------|
| <img width="1919" height="1049" alt="Dashboard" src="https://github.com/user-attachments/assets/a7977c03-7958-4488-9690-0a396e78852c" /> | <img width="1919" height="1050" alt="Add Product" src="https://github.com/user-attachments/assets/0bcae3ad-4a0e-4d75-b1d8-b6ebe14374cb" /> | <img width="1919" height="1061" alt="Analytics" src="https://github.com/user-attachments/assets/20e5db91-adc4-4ee9-9046-fd0b71156b46" /> |

---

🎥 *Demo Video Coming Soon – showcasing full user to admin experience.*


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
