const express = require('express');
const router = express.Router();
const { getBooks, getBook, createBook, deleteBook, updateBook } = require('../controllers/bookController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getBooks)
    .post(protect, createBook);

router.route('/:id')
    .get(protect, getBook)
    .delete(protect, deleteBook)
    .put(protect, updateBook);

module.exports = router;