// [Tickets] app/models/team.js

var mongoose = require('mongoose');

var team = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		// unique lower-case identifier for team
		// derrived from the frist 8 characters of this
		// object's MongoDB Object ID
		type: String,
		unique: true,

		// slug can only contain lower-case letters and dashes
		match: /[a-z0-9]{8}/,
	},

	// name of city or school that team belongs to
	sponsor: String,
});

team.pre('save', function(next) {
	// generate slug from the first 8 characters of the MongoDB-assigned ID`
	this.slug = this._id.toString().substring(0, 8);
	next();
});

module.exports = mongoose.model('Team', team);
