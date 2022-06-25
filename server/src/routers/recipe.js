const express = require('express')
const router = express.Router()
const { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } = require('../controllers/recipe')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getAllRecipes)
router.route('/').post(protect, addRecipe)
router.route('/:id').get(protect, getRecipe).post(protect, editRecipe).delete(protect, deleteRecipe)

module.exports = router
