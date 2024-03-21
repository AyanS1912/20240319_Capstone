const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')

// Route to create default user
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router