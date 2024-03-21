const express = require('express')
const router = express.Router()
const deckVoteController = require('../controllers/deckVoteControllers')

// Routes for deck voting

// Route to upvote a deck by deck ID
router.post('/:deckId/upvote', deckVoteController.upvoteDeck);
// Route to downvote a deck by deck ID
router.post('/:deckId/downvote', deckVoteController.downvoteDeck);

module.exports = router;


module.exports = router
