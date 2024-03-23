const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

// Routes for deck management

// Route to get all decks
router.get('/getAll', controllers.deckController.getAllDecks);
// Route to get a single deck by ID
router.get('/get/:id', controllers.deckController.getSingleDeck);
// Route to create a new deck
router.post('/post', controllers.deckController.postDeck);
// Route to update a deck by ID
router.put('/update/:id', controllers.deckController.updateDeck);
// Route to delete a deck by ID
router.delete('/delete/:id', controllers.deckController.deleteDeck);

module.exports = router
