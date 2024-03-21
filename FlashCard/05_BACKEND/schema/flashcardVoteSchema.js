const mongoose = require('mongoose')

const flashcardVoteSchema = new mongoose.Schema({
  flashcardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  voteType: {
    type: String,
    enum: ['upvote', 'downvote'],
  }
})


const FlashcardVote = mongoose.model('FlashcardVote', flashcardVoteSchema)

module.exports = { FlashcardVote }