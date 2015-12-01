// [Tickets] app/routes/auth.js

var util = require('../util/auth');

module.exports = function(app, passport) {
	// GET /profile

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: 'email',
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/',
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}
