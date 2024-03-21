const express = require('express')
const router = express.Router()
const flashcardvoteController = require('../controllers/flashcardVoteControllers')

// Route to upvote a flashcard
router.post('/:flashcardId/upvote', flashcardvoteController.upvoteFlashcard);
// Route to downvote a flashcard
router.post('/:flashcardId/downvote', flashcardvoteController.downvoteFlashcard);

module.exports = router
