import express from 'express'
import { addProduct, listProduct, removeProduct } from '../controller/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from "../middleware/adminAuth.js"

let productRoutes = express.Router()

// ✅ Add adminAuth before multer (correct order)
productRoutes.post(
  "/addproduct",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// ✅ No changes needed for these
productRoutes.get("/list", listProduct);
productRoutes.post("/remove/:id", adminAuth, removeProduct);

export default productRoutes;
