// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient, Role } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

// A secret key for signing JWTs. Store this in an environment variable in production.
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-for-development';

// --- Controller for User Registration (No changes needed here) ---
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Please enter all required fields.' });
    }

    const roleUpperCase = role.toUpperCase();
    if (!Object.values(Role).includes(roleUpperCase)) {
        return res.status(400).json({ error: 'Invalid role specified.' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: roleUpperCase,
      },
    });

    const { password: _, ...userToReturn } = newUser;

    res.status(201).json({
      message: 'User registered successfully!',
      user: userToReturn,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

// --- UPDATED Controller for User Login ---
const loginUser = async (req, res) => {
  try {
    // The 'role' is no longer received from the request body.
    const { email, password } = req.body;

    // --- 1. Validation ---
    // The validation now only checks for email and password.
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }

    // --- 2. Find User ---
    // Find the user by their unique email in the database.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // --- 3. Verify Password ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // --- 4. Role Verification is REMOVED ---
    // We no longer check the role here because the frontend doesn't send it.
    // The user's role from the database will be used directly.

    // --- 5. Create JWT ---
    // The payload correctly includes the user's role fetched from the database.
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // This role comes directly from the database
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    // --- 6. Send Response ---
    // The response includes the user object (with the role) and the token.
    const { password: _, ...userToReturn } = user;

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: userToReturn,
    });

  } catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Server error during login.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
