const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')

// Route to register a new user
router.post('/register', authController.register);
// Route to authenticate and log in a user
router.post('/login', authController.login);

module.exports = router