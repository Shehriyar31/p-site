const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for super admin
    if (username.toLowerCase() === 'gillanibhai' && password === 'syedmoiz999$7') {
      const token = jwt.sign(
        { id: 'superadmin', role: 'superadmin', username: 'GillaniBhai' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        success: true,
        token,
        user: { id: 'superadmin', name: 'GillaniBhai', role: 'superadmin' }
      });
    }

    // Find user in database
    const user = await User.findOne({
      $or: [{ username }, { name: username }]
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // Check account status
    if (user.accountStatus !== 'approved') {
      return res.status(400).json({ 
        success: false, 
        message: user.accountStatus === 'pending' 
          ? 'Account pending approval' 
          : 'Account has been rejected' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        balance: user.balance
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    // Check if username exists (case insensitive)
    const existingUsername = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    if (existingUsername) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    // Check if email exists (case insensitive)
    const existingEmail = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') }
    });

    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }

    // Create new user
    const user = new User({
      name,
      username,
      email,
      phone,
      password,
      role: 'user'
    });

    await user.save();

    // Emit real-time update for new user registration
    const io = req.app.get('io');
    if (io) {
      const userResponse = user.toObject();
      delete userResponse.password;
      io.emit('newUser', userResponse);
    }

    res.json({
      success: true,
      message: 'User registered successfully',
      userId: user._id
    });

  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 11000) {
      // MongoDB duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false, 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;