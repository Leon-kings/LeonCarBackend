//routes/Post.js
const { Post, validate } = require('../models/post')
const express = require('express')
const router = express.Router()
const postRouter = router.post('/post/cars', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let post = await Post.findOne({ image: req.body.image })
    if (post) {
        return res.status(400).send('image already exisits. Please post other')
    }else {
        try {
           
         
            const post = new Post({
                name: req.body.name,
               head: req.body.head,
               details: req.body.details,
               image: req.body.image
            })
            await post.save()
            
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})
module.exports = postRouter