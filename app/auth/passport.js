// [Tickets] app/auth/passport.js

var facebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var authConfig = require('../config/auth');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.user(new facebookStrategy({
		clientID: authConfig.facebook.clientID,
		clientSecret: authConfig.facebook.clientSecret,
		callbackURL: authConfig.facebook.callbackURL,
	}, function(token, refreshToken, profile, done) {
		// facebook sends back the token and profile

		proces.nextTick(function() {
			User.findOne({
				'facebook.id': profile.id,
			}, function(err, user) {
				if (err) {
					// error connecting to the database
					done(err);
				} else {
					if (user) {
						// existing user found, output user document
						done(null, user);
					} else {
						// no user with Facebook ID, create new user
						var newUser = new User();

						newUser.facebook.id = profile.id;
						newUser.facebook.token = token;
						newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
						newUser.facebook.email = profile.emails[0].value;

						newUser.save(function(err) {
							if (err) {
								throw err;
							} else {
								done(null, newUser);
							}
						});
					}
				}
			});
		});
	}));
};
