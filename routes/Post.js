const express = require('express');
const mongoose = require('mongoose');
const post = require('../models/post');
const bodyParser = require('body-parser');
const router = express.Router()
const app = express();
// Middleware
app.use(bodyParser.json()); // For parsing application/json
// POST route to create a new post
const postRouter = router.post('/post', async (req, res) => {
    try {
      const { title, content } = req.body;
      
      // Create a new Post
      const newPost = new Post({
        title,
        content
      });
  
      // Save the post to the database
      const savedPost = await newPost.save();
      
      // Send response
      res.status(201).json(savedPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  module.exports = postRouter