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

    res.status(200).json(books);
});

// @desc    Get user book
// @route   GET /api/books/:id
// @access  Private
const getBook = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    if (book.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to view this book');
    }

    res.status(200).json(book);
});

// @desc    Create new books
// @route   POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {
    const { category, author, title, publisher, year, isFavorite } = req.body;

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

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    if (book.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to view this book');
    }

    await book.deleteOne();

    res.status(200).json({ success: true });
});

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    if (book.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to view this book');
    }

    const updateBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updateBook);
});

module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook,
};