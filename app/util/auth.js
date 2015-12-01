// [Tickets] app/util/auth.js

exports.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
};
