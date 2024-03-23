const express = require('express')
const router = express.Router()
const controllers = require('../controllers');

// Route to register a new user
router.post('/register', controllers.authController.register);
// Route to authenticate and log in a user
router.post('/login', controllers.authController.login);

module.exports = router