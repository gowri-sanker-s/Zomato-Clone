const mongoose = require('mongoose');

// Define the schema for the Mealtype model
const mealtypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  meal_type: {
    type: Number,
    required: true,
  },
});

// Create the Mealtype model
const Mealtype = mongoose.model('Mealtype', mealtypeSchema);

module.exports = Mealtype;
