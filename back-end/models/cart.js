const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  name: String,
  price:  Number,
  quantity: Number,
  imageUrl: String
});

const orderSchema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  userAddress: { type: String, required: true },
  total: { type: Number, required: true },
  order: [orderItemSchema],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
