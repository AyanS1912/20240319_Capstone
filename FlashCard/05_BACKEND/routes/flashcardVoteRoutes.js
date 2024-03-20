const express = require('express')
const router = express.Router()
const flashcardvoteController = require('../controllers/flashcardVoteControllers')

// Route to create default deck
router.post('/createDefaultvote', flashcardvoteController.createDefaultFlashcardVote);

module.exports = router
