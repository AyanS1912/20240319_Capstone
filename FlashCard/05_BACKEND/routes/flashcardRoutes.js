const express = require('express')
const router = express.Router()
const flashcardController = require('../controllers/flashcardControllers')

// Route to create default deck
router.post('/createDefaultfc', flashcardController.createDefaultFlashcard);

module.exports = router
