'use strict';
var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;

exports.setup = function(User, config) {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		User.findOne({
			email: email.toLowerCase()
		},
		function(err, user) {
			if(err) {
				return done(err);
			}
			if(!user) {
				return done(null, false, { message: 'Email is not registered' });
			}
			if(!user.authenticate(password)) {
				return done(null, false, { message: 'Password is Incorrect' });
			}
			return done(null, user);
		});
	}))
};