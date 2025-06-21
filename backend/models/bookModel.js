const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['OS', 'Database', 'Programming', 'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'AI', 'DevOps', 'Networking', 'Software Engineering', 'Game Development', 'Blockchain', 'Other'],
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    publisher: {
        type: String,
        required: [true, 'Please add a description'],
    },
    year: {
        type: Number,
        required: [true, 'Please add a year'],
    },
    isFavorite: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('Book', bookSchema);

module.exports = User;
