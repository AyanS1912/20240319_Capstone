const express = require('express')
const router = express.Router()
const deckVoteController = require('../controllers/deckVoteControllers')

// Route to create default deck
router.post('/createDefaultvote', deckVoteController.createDefaultDeckVote);

module.exports = router
