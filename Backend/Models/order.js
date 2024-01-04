const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
