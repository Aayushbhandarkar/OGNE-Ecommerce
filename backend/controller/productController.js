import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // ✅ Fallback check for multer errors
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No image files found" });
    }

    // ✅ Defensive: wait for disk write completion (for Windows temp issues)
    await new Promise((resolve) => setTimeout(resolve, 100));

    const getPath = (file) => (file && file[0]?.path ? file[0].path : null);

    let image1 = await uploadOnCloudinary(getPath(req.files.image1));
    let image2 = await uploadOnCloudinary(getPath(req.files.image2));
    let image3 = await uploadOnCloudinary(getPath(req.files.image3));
    let image4 = await uploadOnCloudinary(getPath(req.files.image4));

    // ✅ Defensive check: ensure at least one image uploaded
    if (!image1 && !image2 && !image3 && !image4) {
      return res.status(400).json({ message: "Image upload failed. Please retry." });
    }

    let productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    console.log("AddProduct error:", error.message || error);
    return res.status(500).json({ message: "AddProduct error", error });
  }
};



export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}

export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}
