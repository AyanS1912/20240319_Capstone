const express = require('express')
const router = express.Router()
const flashcardvoteController = require('../controllers/flashcardVoteControllers')

// Route to create default deck
router.post('/:flashcardId/upvote', flashcardvoteController.upvoteFlashcard)
router.post('/:flashcardId/downvote', flashcardvoteController.downvoteFlashcard)

module.exports = router
