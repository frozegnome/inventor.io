'use strict';

var express = require('express'),
		passport = require('passport'),
		auth = require('../auth.service'),
		router = express.Router();

router.post('/', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		var error = err || info;
		
		if(error) {
			return res.status(401).json(error);
		}
		if(!user) {
			return res.status(404).json({ message : 'User was not found' });
		}

		var token = auth.signToken(user._id, user.role);
		res.json({ token : token });
	})(req, res, next) //TODO: Look into this
});

module.exports = router;