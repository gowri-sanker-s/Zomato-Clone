const mongoose = require('mongoose');

// Define the schema for the Location model
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city_id: {
    type: Number,
    required: true,
  },
  location_id: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country_name: {
    type: String,
    required: true,
  },
});

// Create the Location model
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
