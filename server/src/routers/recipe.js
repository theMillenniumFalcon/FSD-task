const express = require('express')
const router = express.Router()
const { getAllRecipes } = require('../controllers/recipe')
const { protect } = require('../middleware/auth')

router.route('/').get( protect, getAllRecipes)

module.exports = router
