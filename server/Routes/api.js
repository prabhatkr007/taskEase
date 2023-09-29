const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Task = require('../models/Task');
const authenticate = require('../middleware/auth');
const salt = bcrypt.genSaltSync(10);

const router = express.Router();


  router.post('/register', async (req, res) => {
      const { username, password } = req.body;
    
      if (!username || !password) {
        return res.status(400).json({ error:'Username and Password are required !'});
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
            res.status(201).json({ message: "User registered successfully !" });
          } else {
            res.status(500).json({ error: "Failed to register" });
          }
        }
        
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });
    
  router.post('/login', async (req, res) => {
      const { username, password } = req.body;
    
      if (!username || !password) {
        return res.status(400).json({ error:'Username and Password are required !'});
      }
    
      try {
        const userDoc = await User.findOne({ username });
    
        if (!userDoc) {
          return res.status(400).json({ error:'User not found'});
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
        res.json({ message: 'User signed in successfully !'});
        } else {
          res.status(400).json({ error:'Wrong credentials'});
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });
    
  router.post('/logout',authenticate, async (req, res) => {
    try {
      const userDoc = req.user;
      const tokenToLogout = req.cookies.jwtoken;

      if (userDoc && tokenToLogout) {
          await userDoc.logout(tokenToLogout);
          res.clearCookie('jwtoken');
          res.status(200).json({ message:'Logged out successfully !'}); 
      } 
      else {
          res.status(400).json({ error:"User not authenticated"}); 
      }
  } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
  }

  });

  router.get('/userdata', authenticate,(req,res)=>{
      
    res.json(req.user.username);

  });

router.post('/tasks',authenticate ,async (req, res) => {
  if(!req.body){

    res.json({error:"Empty list can't be created"})
  }
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      createdBy: req.user._id, 
    };

    const task = await Task.create(taskData);

    if(task){
      res.json({ message: 'Task created successfully !'});
      console.log(task);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/tasks', authenticate, async (req, res) => {
  try {
    const userId = req.user._id; 
    const tasks = await Task.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .exec();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.put('/tasks/:taskId',authenticate, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      completed: req.body.completed,
    };

    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/tasks/:taskId', authenticate,async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }else{
      res.json({ message: 'Task deleted successfully !' });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
  