// [Tickets] app/models/game.js

var mongoose = require('mongoose');
var validate = require('../util/validation');

var game = new mongoose.Schema({
	slug: {
		// - used in URLs in place of longer MongoDB object ID
		// - indexed for faster mapping of slug -> _id
		type: String,
		index: {
			unique: true,
		},

		// slug can only be a series of 8 lower-case letters and numbers
		match: /[a-z0-9]{8}/,
	},
	teams: {
		home: {
			type: mongoose.Schema.ObjectId,
			ref: 'Team',
			required: true,
		},
		away: {
			type: mongoose.Schema.ObjectId,
			ref: 'Team',
			required: true,
		},
	},
	location: {
		city: String,
		state_code: {
			type: String,

			// handle validation of US state codes
			// - see [Tickets] app/util/validation.js@usStateCode for
			//   validation logic
			validate: [
				validate.usStateCode,
				'Not a valid US state abbreviation',
			],
		},
		venue: String,
	},
});

game.pre('save', function(next) {
	// generate slug from the first 8 characters of the MongoDB-assigned ID`
	this.slug = this._id.toString().substring(0, 8);
	next();
});

module.exports = mongoose.model('Game', game);
