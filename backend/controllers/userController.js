const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

// @desc    Register a new User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    //Find if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isAdmin = req.body.isAdmin || false; // Allow setting isAdmin through request body

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin // Default to false, can be changed later
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Login a User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get current user
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
    }
    res.status(200).json({ user });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};