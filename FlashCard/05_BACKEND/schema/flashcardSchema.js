
const mongoose = require('mongoose')

const flashcardSchema = new mongoose.Schema({

    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    frontText: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    backText: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
    },
    tags: [{
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Boolean
    },
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    }
})


const Flashcard = mongoose.model('Flashcard', flashcardSchema)

module.exports = { Flashcard }