const Order = require("../Models/order.js");
const jwt = require("jsonwebtoken");

exports.placeOrder = async (req, res) => {
  const { customerName, cart, subTotal } = req.body;

  try {
    const newOrder = new Order({
      username: customerName,
      items: cart,
      totalAmount: subTotal,
    });
    console.log("Request Payload", req.body);
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getOrderHistory = async (req, res) => {
  console.log("orderHistory called");
  const { customerName } = req.params;
  try {
    const orderHistory = await Order.find({ username: customerName })
      .sort({ _id: "desc" })
      .exec();
    res.json(orderHistory);
  } catch (error) {
    console.error("Error fetching order History", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteOrderHistory = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (deletedOrder) {
      res.json({ message: "Order deleted successfully", deletedOrder });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
