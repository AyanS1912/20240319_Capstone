const express = require('express');
const router = express.Router();
const deckControllers = require('../controllers/deckControllers');
const { route } = require('./userRoutes');

// Route to create default deck
router.post('/createDefaultdeck', deckControllers.createDefaultDeck);

module.exports = router
