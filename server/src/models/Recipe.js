const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A recipe must have a name'],
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
	photoUrl: {
		type: String,
		default: ''
	}
});

const Recipe = mongoose.model("Recipe", RecipeSchema)
module.exports = Recipe