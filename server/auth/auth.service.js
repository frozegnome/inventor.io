'use strict';

var mongoose = require('mongoose'),
		config = require('..config/environment'),
		passport = require('passport'),
		User = require('../api/user/user.model'),
		compose = require('composable-middleware'),
		jwt = require('jsonwebtoken'),
		expressJwt = require('express-jwt'),
		validateJwt = expressJwt({ secret: config.secrets.session });


// Attaches User object to request if authenticated; otherwise returns 403
function isAuthenticated() {
	return compose()
	// Validate Token (jwt)
	.use(function(req, res, next) {
		// Allow access_token to be passed through query param
		if(req.query && req.query.hasOwnProperty('access_token')) {
			req.headers.authorization = 'Bearer ' + req.query.access_token
		}
		validateJwt(req, res, next)
	})
	// Attach User to request
	.use(function(req, res, next) {
		User.findById(req.user._id, function(err, user) {
			if(err) {
				return next(err);
			}
			if(!user) {
				return res.status(401).send('Unauthorized');
			}
			req.user = user;
			next();
		});
	});
}

// Checks for Authorization level of User's Role
function isAuthorized(roleReq) {
	if(!roleReq) {
		throw new Error('Required role must be set');
	}

	return compose()
	.use(isAuthenticated())
	.use(function meetsRequirements(req, res, next) {
		if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleReq)) {
			next();
		}
		else {
			res.status(403).send('Forbidden');
		}
	});
}

// Returns a jsonwebtoken via the app's secret
function signToken(id) {
	return jwt.sign({ _id : id }, config.secrets.session, { expiresInMinutes : 60*5 });
}

// Set token cookie directly for OAuth strategies
function setTokenCookie(req, res) {
	if(!req.user) {
		return res.status(404).json({ message : 'An error occured, please try again' });
	}
	var token = signToken(req.user._id, req.user.role);

	res.cookie('token', JSON.stringify(token));
	res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.isAuthorized = isAuthorized;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;