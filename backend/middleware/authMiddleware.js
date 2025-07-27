// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Make sure to use the same JWT_SECRET as in your authController
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-for-development';

/**
 * Middleware to protect routes that require authentication.
 * It verifies the JWT from the Authorization header.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and is formatted correctly ("Bearer [token]")
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using the secret key
      const decoded = jwt.verify(token, JWT_SECRET);

      // 3. Find the user from the database using the ID from the token's payload.
      // We select all fields except for the password for security.
      req.user = await prisma.user.findUnique({
        where: { id: decoded.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      // If the user associated with the token is not found (e.g., deleted), deny access.
      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized, user not found' });
      }

      // 4. If everything is successful, call next() to proceed to the actual route handler.
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header, deny access.
  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };