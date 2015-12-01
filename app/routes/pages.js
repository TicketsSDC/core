// [Tickets] /app/routes/pages.js

var GameController = require('../controllers/game');

module.exports = function pageRoutes(app) {
	app.get('/', GameController.requestAllGames, function(req, res) {
		res.render('frontpage', {
			games: res.games,
		});
	});

	app.get('/game/:game_slug', GameController.slugToId, GameController.requestGame, function(req, res) {
		res.render('market', {
			game: res.game,
			asks: [{
				unread: true,
				price: 42.5,
				distance: 0.3,
			}, {
				unread: false,
				price: 40,
				distance: 4.5,
			}],
		});
	});
};
