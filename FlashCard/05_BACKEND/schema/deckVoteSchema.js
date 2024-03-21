const {mongoose} = require('../utils/import')

const deckVoteSchema = new mongoose.Schema({
    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deck',
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


  const DeckVote = mongoose.model('DeckVoteSchema', deckVoteSchema)

  module.exports = { DeckVote }