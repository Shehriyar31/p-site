const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Trim whitespace from inputs
    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();

    // Check for super admin
    if (trimmedUsername.toLowerCase() === 'gillanibhai' && trimmedPassword === 'syedmoiz999$7') {
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
      $or: [{ username: trimmedUsername }, { name: trimmedUsername }]
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(trimmedPassword);
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
    const { name, username, email, phone, password, referralCode } = req.body;
    
    // Trim whitespace from all inputs
    const trimmedName = name?.trim();
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedPassword = password?.trim();
    const trimmedReferralCode = referralCode?.trim();

    // Validate referral code
    if (!trimmedReferralCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Referral code is required' 
      });
    }

    // Check if referral code exists
    const referrer = await User.findOne({ username: trimmedReferralCode });
    if (!referrer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid referral code' 
      });
    }

    // Check if username exists (case insensitive)
    const existingUsername = await User.findOne({
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') }
    });

    if (existingUsername) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    // Check if email exists (case insensitive)
    const existingEmail = await User.findOne({
      email: { $regex: new RegExp(`^${trimmedEmail}$`, 'i') }
    });

    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }

    // Create new user
    const user = new User({
      name: trimmedName,
      username: trimmedUsername,
      email: trimmedEmail,
      phone: trimmedPhone,
      password: trimmedPassword,
      role: 'user',
      referredBy: referrer._id
    });

    await user.save();

    // Note: Level rewards will be given when user account gets activated, not during registration

    // Emit real-time update for new user registration
    const io = req.app.get('io');
    if (io) {
      const userResponse = user.toObject();
      delete userResponse.password;
      io.emit('newUser', userResponse);
    }

    res.json({
      success: true,
      message: 'User registered successfully with referral code',
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

// Validate referral code
router.get('/validate-referral/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const user = await User.findOne({ username: code });
    
    res.json({
      success: true,
      valid: !!user,
      message: user ? 'Valid referral code' : 'Invalid referral code'
    });
    
  } catch (error) {
    console.error('Validate referral error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;