const express = require('express')
const router = express.Router()
const deckVoteController = require('../controllers/deckVoteControllers')

// Route to create default deck
router.post('/:deckId/upvote', deckVoteController.upvoteDeck)
router.post('/:deckId/downvote', deckVoteController.downvoteDeck)

module.exports = router
