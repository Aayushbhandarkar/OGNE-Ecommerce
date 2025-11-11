import Order from "../model/orderModel.js";

// ✅ Update delivery location & status (Admin use)
export const updateDeliveryLocation = async (req, res) => {
  try {
    const { orderId, latitude, longitude, status } = req.body;

    if (!orderId || !latitude || !longitude)
      return res.status(400).json({ message: "Incomplete location data" });

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { latitude, longitude, status },
      { new: true }
    );

    res.status(200).json({ message: "Delivery location updated", updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update delivery location" });
  }
};

// ✅ Get current delivery location & status (User use)
export const getDeliveryLocation = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json({
      latitude: order.latitude,
      longitude: order.longitude,
      status: order.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch delivery location" });
  }
};
