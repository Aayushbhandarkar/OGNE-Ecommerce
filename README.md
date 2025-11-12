🛍️ OGNÉ – AI Powered E-Commerce Platform

OGNÉ is a modern, AI-powered fashion e-commerce website built using the MERN Stack.
It delivers a premium shopping experience inspired by ZARA & H&M, with features like AI recommendations, live order tracking, Razorpay payments, admin dashboard, and more.

🌐 Live Links
| Platform              | URL                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------ |
| 🖥️ **Frontend**      | [https://ogne-ecommerce-frontend.vercel.app](https://ogne-ecommerce-frontend.vercel.app)   |
| ⚙️ **Backend API**    | [https://ogne-ecommerce-backend.onrender.com](https://ogne-ecommerce-backend.onrender.com) |
| 🧑‍💼 **Admin Panel** | [https://ogne-ecommerce-admin1.onrender.com](https://ogne-ecommerce-admin1.onrender.com)   |

⚙️ Tech Stack
| Type               | Technologies                                            |
| ------------------ | ------------------------------------------------------- |
| **Frontend**       | React.js, Tailwind CSS, Framer Motion, Axios, Chart.js  |
| **Backend**        | Node.js, Express.js, MongoDB                            |
| **Authentication** | JWT, Firebase Google Auth                               |
| **Payments**       | Razorpay                                                |
| **Hosting**        | Render (Backend), Vercel (Frontend), MongoDB Atlas      |
| **Extras**         | Cloudinary, React Toastify, Leaflet.js (Order Tracking) |

🚀 Features
🧍‍♂️ User Side

👕 Beautiful UI inspired by ZARA / H&M

🔐 Secure Authentication (Email + Google Login)

🧾 Cart & Checkout with Razorpay integration

🌍 Real-time Order Tracking (Delivery Stages + Map)

🧠 AI-based product recommendations

📥 Download Invoice (PDF format)

✨ Responsive across all devices

🧑‍💼 Admin Side

📦 Add / Edit / Delete Products

📊 Sales Analytics Dashboard

🚚 Update Order Status (Packing → Shipped → Out for Delivery → Delivered)

🗺️ Order Map & Tracking Visualization

👥 Manage Users & Orders


🧩 Folder Structure

OGNE-Ecommerce/
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   └── vite.config.js
│
└── admin/
    ├── src/
    ├── pages/
    ├── components/
    └── context/

⚡ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/Aayushbhandarkar/OGNE-Ecommerce.git
cd OGNE-Ecommerce

2️⃣ Backend Setup
cd backend
npm install
npm run dev

Create .env file in /backend
PORT=6000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

4️⃣ Admin Panel Setup
cd admin
npm install
npm run dev


💳 Razorpay Test Card
Use the below card for testing payments in development:

yaml
Copy code
Card No: 4111 1111 1111 1111  
Expiry: Any future date  
CVV: 123
🧭 Real-Time Delivery Tracking
📍 Dynamic delivery stages:

Order Placed

Packing

Shipped

Out for Delivery

Delivered

🗺️ Realistic tracking UI using Leaflet.js

🔄 Auto-updates every few seconds

🧠 AI Features
Personalized recommendations based on user behavior.

Smart search results (context-aware).

Upcoming: AI chatbot for shopping assistance 🤖

🖼️ Screenshots
🧠 You can add 10–12 images here. Use Markdown tables for perfect alignment.

Home Page	Product Page	Cart Page

Checkout	Order Tracking	Admin Dashboard

🖼️ Future Additions:

Product upload preview

Razorpay payment success popup

AI recommendation demo

Mobile layout showcase

🎥 Demo Video (Coming Soon)
Add your demo walkthrough here 👇

markdown
Copy code
🎬 [Watch the Full Demo on YouTube](https://youtu.be/demo-link)
👨‍💻 Author
Ayush Bhandarkar
🎓 B.Tech Computer Engineering | MIET Bhandara
💼 MERN Stack & AI Developer
📧 ayushbhandarkar1503@gmail.com
🔗 LinkedIn | GitHub

🪄 Contributing
Pull requests are welcome!
Just fork → modify → submit PR 🙌

🧾 License
Licensed under the MIT License — free to use and modify.

⭐ Support
If you like OGNÉ, please give it a ⭐ on GitHub —
your star motivates me to build more amazing open-source projects 🚀


