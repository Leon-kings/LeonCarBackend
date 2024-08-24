const express = require('express');

const multer = require('multer');

const image = require('../models/image');
const app = express();
// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Set up Multer for file upload handling
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// POST route to upload an image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const { originalname, mimetype, buffer, size } = req.file;
  
      // Create a new Image document
      const newImage = new Image({
        originalname,
        mimetype,
        buffer,
        size
      });
  
      // Save the image to the database
      const savedImage = await newImage.save();
      
      // Send response
      res.status(201).json(savedImage);
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });