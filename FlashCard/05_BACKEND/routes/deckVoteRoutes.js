const express = require('express')
const router = express.Router()
const controllers = require('../controllers');
// Routes for deck voting

// Route to upvote a deck by deck ID
router.post('/:deckId/upvote', controllers.deckVoteController.upvoteDeck);
// Route to downvote a deck by deck ID
router.post('/:deckId/downvote', controllers.deckVoteController.downvoteDeck);

module.exports = router;


module.exports = router
