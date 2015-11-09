'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		UserModel = new Schema({
			name: String,
			password: String,
			role: String
		});

module.exports = mongoose.model('User', UserModel);