// [Tickets] app/util/helpers.js

var handlebars = require('handlebars');

exports.formatDollars = function(value) {
	if (value % 1 === 0) {
		// value is in whole dollars so don't render the
		// two trailing zeros
		var formattedValue = value.toFixed(0);
	} else {
		// value has a non-zero amount of cents so show the
		// fraction and any trailing zeros
		var formattedValue = value.toFixed(2);
	}

	return new handlebars.SafeString('<span class="dollar-sign">$</span>' + formattedValue);
};

exports.formatDistance = function(value) {
	return value.toString() + ' miles';
};
