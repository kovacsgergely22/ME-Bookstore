const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');
const Book = require('../models/BookModel');

// @desc    Get user books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const books = await Book.find({ user: req.user.id });

    res.status(200).json({ books });
});

// @desc    Create new books
// @route   POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {
    const {category, author, title, publisher, year, isFavorite} = req.body;

    if (!category || !author || !title || !publisher || !year) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const book = await Book.create({
        user: req.user.id,
        category,
        author,
        title,
        publisher,
        year,
        isFavorite: isFavorite || false
    });

    res.status(201).json({ book });
});

module.exports = {
    getBooks,
    createBook
};