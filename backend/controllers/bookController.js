const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');
const Book = require('../models/BookModel');

// @desc    Get user books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'getBooks' });
});

// @desc    Create new books
// @route   POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'createBooks' });
});

module.exports = {
    getBooks,
    createBook
};