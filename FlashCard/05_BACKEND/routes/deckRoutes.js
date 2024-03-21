const express = require('express');
const router = express.Router();
const deckControllers = require('../controllers/deckControllers');
// const { route } = require('./userRoutes');

router.get('/getAll',deckControllers.getAllDecks)
router.get('/get/:id',deckControllers.getSingleDeck)
router.post('/post', deckControllers.postDeck)
router.put('/update/:id',deckControllers.updateDeck)
router.delete('/delete/:id',deckControllers.deleteDeck)

module.exports = router
