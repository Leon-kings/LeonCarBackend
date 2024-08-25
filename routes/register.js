//routes/register.js
const { User, validate } = require('../models/user')
const Token = require("../models/Tokens");
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const sendEmail = require("../utils/Email");
const jwt = require('jsonwebtoken');
const secretKey = 'abc@123'; 
const registerRouter = router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password
            })
            await user.save();
            // Tokens starts
            let token = await new Token({
                userId: user._id,
                token: jwt.sign(user, secretKey, { expiresIn: '1h' }),
              }).save();
          
              const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
              await sendEmail(user.email, "Verify Email", message);
          
              res.send("An Email sent to your account please verify");
            // return res.status(201).json(user);
           
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
  router.get("/verify/:id/:token", async (req, res) => {
        try {
          const user = await User.findOne({ _id: req.params.id });
          if (!user) return res.status(400).send("Invalid link");
      
          const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
          });
          if (!token) return res.status(400).send("Invalid link");
      
          await User.updateOne({ _id: user._id, verified: true });
          await Token.findByIdAndRemove(token._id);
      
          res.send("email verified sucessfully");
        } catch (error) {
          res.status(400).send("An error occured");
        }
      });
      
})

module.exports = registerRouter