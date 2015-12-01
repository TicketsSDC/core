// [Tickets] app/controllers/game.js

var Game = require('../models/game');

exports.createGame = function(req, res, next) {
	var newGame = new Game();

	newGame.teams.home = req.body.home_team_id;
	newGame.teams.away = req.body.away_team_id;
	newGame.location.city = req.body.city;
	newGame.location.state_code = req.body.state_code;
	newGame.location.venue = req.body.venue;

	newGame.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.game = newGame;
		}

		next();
	});
};

exports.requestGame = function(req, res, next) {
	Game.findById(req.params.game_id).populate('teams.home teams.away').exec(function(err, game) {
		if (err) {
			res.send(err);
		} else {
			res.game = game;
		}

		next();
	});
};

exports.updateGame = function(req, res, next) {
	Game.findById(req.params.game_id).exec(function(err, game) {
		if (err) {
			res.send(err);
		} else {
			game.teams.home = (req.body.home_team_id !== undefined) ? req.body.home_team_id : game.teams.home;
			game.teams.away = (req.body.away_team_id !== undefined) ? req.body.away_team_id : game.teams.away;
			game.location.city = (req.body.city !== undefined) ? req.body.city : game.location.city;
			game.location.state_code = (req.body.state_code !== undefined) ? req.body.state_code : game.location.state_code;
			game.location.venue = (req.body.venue !== undefined) ? req.body.venue : game.location.venue;

			game.save(function(err) {
				if (err) {
					res.send(err);
				} else {
					res.game = game;
				}

				next();
			});
		}
	});
};

exports.deleteGame = function(req, res, next) {
	Game.findById(req.params.game_id).remove().exec(function(err) {
		if (err) {
			res.send(err);
		}

		next();
	});
};

exports.requestAllGames = function(req, res, next) {
	// TODO: filter `_v` field out of output JSON object?
	Game.find({}).populate('teams.home teams.away').exec(function(err, games) {
		if (err) {
			res.send(err);
		} else {
			res.games = games;
			next();
		}
	});
};

/* Map Game "slugs" to the MongoDB Game _id
 * - Meant to be used as middleware in a response pipeline since
 *   this method takes the request body parameter `game_slug` and
 *   manually sets a new request body parameter `game_id` before
 *   passing the mutated request down the pipeline
 */
exports.slugToId = function(req, res, next) {
	// TODO: handle no-match scenarios
	Game.findOne({
		slug: req.params.game_slug,
	}).select('_id').exec(function(err, game) {
		if (err) {
			res.send(err);
		} else {
			// found 1 or 0 matching games
			if (game === null) {
				// no matching games
				res.status(404);
			} else {
				// 1 matching game
				req.params.game_id = game._id;
			}

			next();
		}
	});
};
