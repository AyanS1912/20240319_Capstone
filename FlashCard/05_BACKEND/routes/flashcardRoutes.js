    const express = require('express')
const router = express.Router()
const controllers = require('../controllers');

// Route to get all flashcards
router.get('/getAll', controllers.flashcardController.getAllFlashcards);
// Route to get a single flashcard by ID
router.get('/get/:id', controllers.flashcardController.getSingleFlashcard);
// Route to create a new flashcard
router.post('/:deckid', controllers.flashcardController.postFlashcard);
// Route to update a flashcard by ID
router.put('/update/:id', controllers.flashcardController.updateFlashcard);
// Route to delete a flashcard by ID
router.delete('/delete/:id', controllers.flashcardController.deleteFlashcard);


module.exports = router
