const express = require('express')
const router = express.Router()
const { search } = require('../controllers/searchControllers')

router.post('/search', search);

module.exports = router
