const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
});

const restaurantSchema = new Schema({
  id: String,
  name: String,
  menu: [menuItemSchema],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
