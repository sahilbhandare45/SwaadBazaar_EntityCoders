const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the middleware

// This is an example of a protected route.
// The 'protect' middleware will run before the main (req, res) handler.
router.get('/data', protect, (req, res) => {
  // If the request reaches this point, it means the user is authenticated.
  // The 'protect' middleware has added the user's data to the `req` object.
  res.status(200).json({
    message: `Welcome to your protected dashboard, ${req.user.name}!`,
    user: req.user,
  });
});

module.exports = router;