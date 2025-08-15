const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get users by role
router.get('/role/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role }).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new user (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, username, email, phone, password, role = 'user' } = req.body;

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
      role,
      status: 'Active',
      accountStatus: 'approved'
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('newUser', userResponse);

    res.json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Create user error:', error);
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

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove password from updates if empty
    if (!updates.password) {
      delete updates.password;
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('userUpdated', user);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('userDeleted', { id });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user balance
router.post('/:id/balance', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (type === 'deposit') {
      user.balance += amount;
    } else if (type === 'withdraw') {
      // Check if user has sufficient balance
      if (user.balance < amount) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient balance. Current balance: ₨${user.balance.toLocaleString()}` 
        });
      }
      user.balance -= amount;
    }

    await user.save();

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('userUpdated', user);

    res.json({ success: true, balance: user.balance });
  } catch (error) {
    console.error('Update balance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;