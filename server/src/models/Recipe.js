const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A recipe must have a name'],
		trim: true
	},
	description: {
		type: String,
		required: [true, 'A recipe must have a description'],
		trim: true
	},
	ingredients: {
		type: [String],
		required: [true, 'A recipe must have atleast one ingredient']
	},
	procedure: {
		type: [String],
		required: [true, 'A recipe must have a procedure']
	},
	photos: {
		type: [String],
		default: ''
	},
	creatorId: {
		type: String,
		default: ''
	}
});

const Recipe = mongoose.model("Recipe", RecipeSchema)
module.exports = Recipe