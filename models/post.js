//models/post.js
const mongoose = require('mongoose')
const Joi = require('joi')
const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 1000
    },
    image: {
        type: String,
        required: true,
      
    },
    details: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 25555
    },
    head: {
        type: String,
        required: true,
        min: 8,
        max: 100000

    }
})
function validatePost(post) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        head: Joi.string().min(5).max(25555555).required(),
        details: Joi.string().min(0).max(10000000).required(),
       
    })
    return schema.validate(post)
}
const Post = mongoose.model('Post', postSchema)
module.exports.validate = validatePost
module.exports = Post