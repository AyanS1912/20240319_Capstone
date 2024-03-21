const express = require('express')
const router = express.Router()
const flashcardController = require('../controllers/flashcardControllers')

// Route to get all flashcards
router.get('/getAll', flashcardController.getAllFlashcards);
// Route to get a single flashcard by ID
router.get('/get/:id', flashcardController.getSingleFlashcard);
// Route to create a new flashcard
router.post('/:deckid', flashcardController.postFlashcard);
// Route to update a flashcard by ID
router.put('/update/:id', flashcardController.updateFlashcard);
// Route to delete a flashcard by ID
router.delete('/delete/:id', flashcardController.deleteFlashcard);


module.exports = router
