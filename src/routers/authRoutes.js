const express = require('express');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Create new user (no password hashing)
        const user = new User({ name, email, password, role });
        await user.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully!' });

        // Send a welcome email
        sendEmail(email, 'Welcome!', 'Thank you for signing up on Job Portal.');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        // Compare passwords (no hashing, plain text comparison)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Respond with a success message (no token)
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
