const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

// Route to create default user
router.get('/getdetails', userController.getUser)
router.post('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router