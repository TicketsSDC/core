// [Tickets] /app/routes/routes.js

var express = require('express');

module.exports = function allRoutes(app) {
	// load route for static file (JS, CSS, images, etc.)
	app.use('/public', express.static('./app/public')); // path relative to `server.js`

	// load routes for pages
	require('./pages')(app);

	// load routes for development API
	require('./api')(app);
};
