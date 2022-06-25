const getAllRecipes = (req, res, next) => {
    res.status(200).json({ success: true, data: "You got access to the private data in this route! "})
}

const addRecipe = (req, res, next) => {
    res.status(200).json({ success: true, data: "You got access to the private data in this route! "})
}

const editRecipe = (req, res, next) => {
    res.status(200).json({ success: true, data: "You got access to the private data in this route! "})
}

module.exports = {
    getAllRecipes, addRecipe, editRecipe
}
