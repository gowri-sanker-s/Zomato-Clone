const mongoose = require('mongoose');

// Define the schema for the Restaurant model
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location_id: {
    type: Number,
    required: true,
  },
  city_id: {
    type: Number,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  thumb: {
    type: [String],
    required: true,
  },
  aggregate_rating: {
    type: Number,
    required: true,
  },
  rating_text: {
    type: String,
    required: true,
  },
  min_price: {
    type: Number,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  cuisine: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ], 
  image: {
    type: String,
    required: true,
  },
  mealtype_id: {
    type: Number,
    required: true,
  },
});

// Create the Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
