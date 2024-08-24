const mongoose = require('mongoose');

// Define the schema for the Image model
const imageSchema = new mongoose.Schema({
  originalname: String,
  mimetype: String,
  buffer: Buffer,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create the Image model
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
