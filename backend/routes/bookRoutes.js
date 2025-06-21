const express = require('express');
const router = express.Router();
const { getBooks, createBook } = require('../controllers/bookController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getBooks)
    .post(protect, createBook);

module.exports = router;