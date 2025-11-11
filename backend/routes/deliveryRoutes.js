import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import isAuth from "../middleware/isAuth.js";
import { updateDeliveryLocation, getDeliveryLocation } from "../controller/deliveryController.js";

const router = express.Router();

// ✅ Admin updates delivery location
router.put("/update/:orderId", adminAuth, updateDeliveryLocation);

// ✅ User views delivery location
router.get("/track/:orderId", isAuth, getDeliveryLocation);

export default router;
