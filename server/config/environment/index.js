'use strict'

var path = require('path'),
	_ = require('lodash');

function requireEnv(name) {
	if(!process.env[name]) {
		throw new Error('Please set the following environment variable: ' + name);
	}
	return process.env[name];
}

// Base Environment Configuration

var base = {
	env: process.env.NODE_ENV,

	// Root Path
	root: path.normalize(__dirname + '/../../..'),

	// Port
	port: process.env.PORT || 9000,

	// IP
	ip: process.env.IP || '0.0.0.0',

	// Session Secret
	secrets: {
		session: process.env.SESSION_SECRET,
	},

	// User Roles
	userRoles: ['guest', 'user', 'admin'],

	// MongoDB Connection
	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	},
};


// Merge and export the above configuration object based on NODE_ENV
module.exports = _.merge(base, require('./' + process.env.NODE_ENV + '.js') || {})