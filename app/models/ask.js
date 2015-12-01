// [Tickets] app/models/ask.js

var mongoose = require('mongoose');

var ask = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	game: {
		type: mongoose.Schema.ObjectId,
		ref: 'Game',
		required: true,
	},
	price: {
		type: Number,
		min: 0,
	},
	state: {
		type: String,
		enum: {
			values: ['OPEN', 'CLOSED', 'EXPIRED'],
			message: 'Ask.state must match one: OPEN, CLOSED, EXPIRED'
		},
		default: 'OPEN',
	},
	bids: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Bid',
	}],
	asked_at: {
		type: Date,
		default: Date.now,
	},
	resolved_at: Date,
});

module.exports = mongoose.model('Ask', ask);
