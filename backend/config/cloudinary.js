import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

// Initial Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary ENV Check:", {
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Present ✅" : "Missing ❌",
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    // ✅ Ensure config is loaded again before upload
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "OneCart_Products",
    });

    fs.unlinkSync(filePath);
    console.log("✅ Uploaded:", uploadResult.secure_url);
    return uploadResult.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.log("❌ Cloudinary upload error:", error.message || error);
    return null;
  }
};

export default uploadOnCloudinary;
