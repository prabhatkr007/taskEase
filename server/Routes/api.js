const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');
const Todo = require('../models/Todos');
const authenticate = require('../middleware/auth');
const salt = bcrypt.genSaltSync(10);
const router = express.Router();


  router.post('/register', async (req, res) => {
      const { username, password } = req.body;
    
      if (!username || !password) {
        return res.status(400).json('Username and password are required');
      }
    
      try {
        const userExist = await User.findOne({ username: username });

        if (userExist) {
          return res.status(422).json({ error: "User already exists" });
        } else {
          const user = new User({
            username,
            password: bcrypt.hashSync(password, salt),
          });
          const userRegister = await user.save();

          if (userRegister) {
            res.status(201).json({ message: "User registered successfully" });
          } else {
            res.status(500).json({ error: "Failed to register" });
          }
        }
        
      } catch (e) {
        console.log(e);
        res.status(400).json(e);
      }
    });
    
    router.post('/login', async (req, res) => {
      const { username, password } = req.body;
    
      if (!username || !password) {
        return res.status(400).json('Username and password are required');
      }
    
      try {
        const userDoc = await User.findOne({ username });
    
        if (!userDoc) {
          return res.status(400).json('User not found');
        }
    
        const passOk = bcrypt.compareSync(password, userDoc.password);
    
        if (passOk) {
        const token = await userDoc.generateAuthToken();
        res.cookie("jwtoken", token, {
        expires:new Date(Date.now() + 25892000000),
        secure: true, 
        httpOnly: true, 
        sameSite: 'none'
      });
        res.json({ message: 'User signed in successfully'});
        } else {
          res.status(400).json('Wrong credentials');
        }
      } catch (e) {
        console.log(e);
        res.status(500).json('Internal Server Error');
      }
    });
    
    
  
  
  router.post('/logout',authenticate, async (req, res) => {
    try {
      const userDoc = req.user;
      const tokenToLogout = req.cookies.jwtoken;

      if (userDoc && tokenToLogout) {
          await userDoc.logout(tokenToLogout);
          res.clearCookie('jwtoken');
          res.status(200).json('Logged out successfully'); 
      } 
      else {
          res.status(400).json("User not authenticated"); 
      }
  } catch (e) {
      console.error(e);
      res.status(500).json('Internal Server Error');
  }
});


module.exports = router;
  