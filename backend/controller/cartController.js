import User from "../model/userModel.js";

// 🛒 Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure cartData is initialized properly
    let cartData = userData.cartData || {};

    // Update cart logic
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Added to cart successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "addToCart error" });
  }
};

// 🛍️ Update Cart Quantity
export const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // Ensure valid structure
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Cart updated successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "updateCart error" });
  }
};

// 🧾 Get User Cart
export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Even if cartData missing, return empty object
    let cartData = userData.cartData || {};
    return res.status(200).json(cartData);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "getUserCart error" });
  }
};
