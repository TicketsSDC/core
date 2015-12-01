// [Tickets] app/util/validation.js

exports.usStateCode = function usStateCode(pendingStateCode) {
	var validCodes = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	var templateMatch = /[A-Z]{2}/;

	if (templateMatch.test(pendingStateCode)) {
		if (validCodes.indexOf(pendingStateCode) >= 0) {
			// pending code DOES exist in list of valid codes
			return true;
		} else {
			// pending code does NOT exist in list of valid codes
			return false;
		}
	} else {
		// pending code did NOT match the basic state code template
		return false;
	}
};
