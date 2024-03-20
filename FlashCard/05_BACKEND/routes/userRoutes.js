const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

// Route to create default user
router.post('/createDefaultUser', userController.createDefaultUser)

module.exports = router