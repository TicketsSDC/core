// [Tickets] app/models/bid.js

var mongoose = require('mongoose');

var bid = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	price: {
		type: Number,
		min: 0,
	},
	ask: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ask',
		required: true,
	},
	state: {
		type: String,
		enum: {
			values: ['OPEN', 'ACCEPTED', 'DENIED', 'EXPIRED'],
			message: 'Bid.state must match one: OPEN, ACCEPTED, DENIED, EXPIRED',
		},
		default: 'OPEN',
	},
	bid_at: {
		type: Date,
		default: Date.now,
	},
	resolved_at: Date,
});

module.exports = mongoose.model('Bid', bid);
