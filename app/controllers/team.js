// [Tickets] app/controllers/team.js

var Team = require('../models/team');

exports.createTeam = function(req, res, next) {
	var newTeam = new Team();

	newTeam.name = req.body.name;
	newTeam.sponsor = req.body.sponsor;

	newTeam.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.team = newTeam;
		}

		next();
	});
};

exports.requestTeam = function(req, res, next) {
	Team.findById(req.params.team_id).exec(function(err, team) {
		if (err) {
			res.send(err);
		} else {
			res.team = team;
		}

		next();
	});
};

exports.updateTeam = function(req, res, next) {
	Team.findById(req.params.team_id).exec(function(err, team) {
		if (err) {
			res.send(err);
		} else {
			team.name = (req.body.name !== undefined) ? req.body.name : team.name;
			team.sponsor = (req.body.sponsor !== undefined) ? req.body.sponsor : team.sponsor;

			team.save(function(err) {
				if (err) {
					TeamErrors.handle(err, req, res);
				} else {
					res.team = team;
				}

				next();
			});
		}
	});
};

exports.deleteTeam = function(req, res, next) {
	Team.findById(req.params.team_id).remove().exec(function(err) {
		if (err) {
			res.send(err);
		}

		next();
	});
};

exports.requestAllTeams = function(req, res, next) {
	Team.find({}).exec(function(err, teams) {
		if (err) {
			res.send(err);
		} else {
			res.teams = teams;
		}

		next();
	});
};
