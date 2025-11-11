import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { addToCart, getUserCart, UpdateCart } from '../controller/cartController.js';

const cartRoutes = express.Router();

// ✅ Change POST → GET (for fetching cart data)
cartRoutes.get('/get', isAuth, getUserCart);

// 🛒 Keep POST for these (since they modify data)
cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/update', isAuth, UpdateCart);

export default cartRoutes;
