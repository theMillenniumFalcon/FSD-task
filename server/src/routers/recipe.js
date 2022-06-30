const express = require('express')
const router = express.Router()
const { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } = require('../controllers/recipe')
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')

router.route('/').get(protect, getAllRecipes)
router.route('/').post(upload.array('photos'), addRecipe)
router.route('/:id').get(protect, getRecipe).patch(protect, editRecipe).delete(protect, deleteRecipe)

module.exports = router
