const Recipe = require('../models/Recipe')

const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find()
        res.send(recipes)
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const getRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.send(recipe)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const addRecipe = async (req, res, next) => {
    const newRecipe = new Recipe(req.body)
    if (req.files) {
        let path = ''
        req.files.forEach(function(files, index, arr) {
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        newRecipe.photo = path
    }

    try {
        const savedRecipe = await newRecipe.save()
        res.status(200).json({ success: true, savedRecipe })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const editRecipe = (req, res, next) => {
    res.status(200).json({ success: true, data: "You got access to the private data in this route! " })
}

const deleteRecipe = async (req, res, next) => {
    const deleteRecipe = Recipe.findById(req.params.id)

    try {
        await deleteRecipe.remove()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe
}
