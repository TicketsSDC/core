// [Tickets] app/models/user.js

var mongoose = require('mongoose');

var user = new mongoose.Schema({
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
	},
});

module.exports = mongoose.model('User', user);
