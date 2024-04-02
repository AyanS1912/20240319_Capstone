const express = require('express')
const router = express.Router()
const controllers = require('../controllers');


router.get('/:deckId', controllers.flashcardVoteController.getAllVotes);
// Route to upvote a flashcard
router.post('/:flashcardId/upvote', controllers.flashcardVoteController.upvoteFlashcard);
// Route to downvote a flashcard
router.post('/:flashcardId/downvote', controllers.flashcardVoteController.downvoteFlashcard);

module.exports = router
