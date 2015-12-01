// [Tickets] /app/routes/api.js

var TeamController = require('../controllers/team');
var GameController = require('../controllers/game');

var HTTP = {
	Success: 200,
	ResourceCreated: 201,
	NoContent: 204,
};

module.exports = function apiRoutes(app) {
	// create a team
	app.post('/api/v1/teams', TeamController.createTeam, function(req, res) {
		res.status(HTTP.ResourceCreated).json(res.team);
	});

	// request a team
	app.get('/api/v1/teams/:team_id', TeamController.requestTeam, function(req, res) {
		res.status(HTTP.Success).json(res.team);
	});

	// update a team
	app.put('/api/v1/teams/:team_id', TeamController.updateTeam, function(req, res) {
		res.status(HTTP.Success).json(res.teams);
	});

	// delete a team
	app.delete('/api/v1/teams/:team_id', TeamController.deleteTeam, function(req, res) {
		res.sendStatus(HTTP.NoContent);
	});

	// get all teams
	app.get('/api/v1/teams', TeamController.requestAllTeams, function(req, res) {
		// TODO: consider implementing pagination
		res.status(HTTP.Success).json(res.teams);
	});

	// create a game
	app.post('/api/v1/games', GameController.createGame, function(req, res) {
		res.status(HTTP.ResourceCreated).json(res.game);
	});

	// request a game
	app.get('/api/v1/games/:game_id', GameController.requestGame, function(req, res) {
		res.status(HTTP.Success).json(res.game);
	});

	// update a game
	app.put('/api/v1/games/:game_id', GameController.updateGame, function(req, res) {
		res.status(HTTP.Success).json(res.game);
	});

	// delete a game
	app.delete('/api/v1/games/:game_id', GameController.deleteGame, function(req, res) {
		res.sendStatus(HTTP.NoContent);
	});

	// get all games
	app.get('/api/v1/games', GameController.requestAllGames, function(req, res) {
		res.status(HTTP.Success).json(res.games);
	});
};
