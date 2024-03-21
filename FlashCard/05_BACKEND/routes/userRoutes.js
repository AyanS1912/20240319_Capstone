const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

// Route to retrieve user details
router.get('/getdetails', userController.getUser);
// Route to update user details
router.post('/update/:id', userController.updateUser);
// Route to delete a user
router.delete('/delete/:id', userController.deleteUser);

module.exports = router