const express = require('express')
const router = express.Router()
const searchController  = require('../controllers/searchControllers')

// Router to search
router.post('/q',searchController)

module.exports = router
