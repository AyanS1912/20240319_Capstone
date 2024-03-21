const express = require('express')
const router = express.Router()
const deckControllers = require('../controllers/deckControllers')


// Routes for deck management

// Route to get all decks
router.get('/getAll', deckControllers.getAllDecks);
// Route to get a single deck by ID
router.get('/get/:id', deckControllers.getSingleDeck);
// Route to create a new deck
router.post('/post', deckControllers.postDeck);
// Route to update a deck by ID
router.put('/update/:id', deckControllers.updateDeck);
// Route to delete a deck by ID
router.delete('/delete/:id', deckControllers.deleteDeck);

module.exports = router
