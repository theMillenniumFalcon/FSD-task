const Recipe = require('../models/Recipe')
const _ = require('lodash')
const { baseURL } = require('../config/config')

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
    let { files } = req
    let resp = []
    _.forEach(files, (file) => {
        let imagePath = file.path.replace("public", baseURL).replace()
        imagePath = imagePath.split('src')[1].substring(1, imagePath.length)
        resp.push(imagePath)
        newRecipe.photos = resp
    })

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
