const mongoose = require('mongoose')

const deckSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
    match: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    match: /^[a-zA-Z0-9 ]*$/,
  },
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

const Deck = mongoose.model('Deck', deckSchema)

module.exports = { Deck }