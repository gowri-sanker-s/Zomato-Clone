const mongoose = require("mongoose");
//const Restaurant = require('../Models/restaurantModel')
// Define the schema for the Menuitems model
const menuitemSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qty:{
    type: Number,
    required: true,
  }
});

// Create the Menuitems model
const Menuitem = mongoose.model("Menuitem", menuitemSchema);

module.exports = Menuitem;
