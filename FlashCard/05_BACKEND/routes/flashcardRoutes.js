const express = require('express')
const router = express.Router()
const flashcardController = require('../controllers/flashcardControllers')

// Route to create default deck
router.get('/getAll',flashcardController.getAllFlashcards)
router.get('/get/:id',flashcardController.getSingleFlashcard)
router.post('/:deckid',flashcardController.postFlashcard)
router.put('/update/:id',flashcardController.updateFlashcard)
router.delete('/delete/:id',flashcardController.deleteFlashcard)


module.exports = router
