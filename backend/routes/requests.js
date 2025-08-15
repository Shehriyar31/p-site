const express = require('express');
const Request = require('../models/Request');
const User = require('../models/User');
const router = express.Router();

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name username phone').sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new request
router.post('/', async (req, res) => {
  try {
    const { userId, type, amount, paymentMethod, transactionId, screenshot, description } = req.body;

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create new request
    const request = new Request({
      userId,
      user: user.name,
      type,
      amount,
      paymentMethod,
      transactionId,
      screenshot,
      phone: user.phone,
      description
    });

    await request.save();

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('newRequest', request);

    res.json({
      success: true,
      message: 'Request created successfully',
      request
    });

  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Approve request
router.post('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Update request status
    request.status = 'Approved';
    await request.save();

    // Update user balance and status if it's a deposit
    if (request.type === 'Deposit') {
      const user = await User.findById(request.userId);
      if (user) {
        user.balance += request.amount; // This will be 865 PKR
        user.status = 'Active';
        user.accountStatus = 'approved';
        await user.save();
        
        // Emit user update
        const io = req.app.get('io');
        io.emit('userUpdated', user);
      }
    }

    // Emit request update
    const io = req.app.get('io');
    io.emit('requestUpdated', request);

    res.json({ success: true, message: 'Request approved successfully' });
  } catch (error) {
    console.error('Approve request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Reject request (automatically deletes)
router.post('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Delete the request instead of marking as rejected
    await Request.findByIdAndDelete(id);

    // Emit request deletion
    const io = req.app.get('io');
    io.emit('requestDeleted', { id });

    res.json({ success: true, message: 'Request rejected and deleted successfully' });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete request manually
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findByIdAndDelete(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Clean up rejected requests (utility route)
router.post('/cleanup', async (req, res) => {
  try {
    const result = await Request.deleteMany({ status: 'Rejected' });
    res.json({ 
      success: true, 
      message: `Cleaned up ${result.deletedCount} rejected requests` 
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;