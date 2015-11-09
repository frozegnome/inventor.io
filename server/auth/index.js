'use strict';

var express = require('express'),
		passport = require('passport'),
		config = require('../config/environment'),
		User = require('../api/user/user.model'),
		router = express.Router();

// Passport Config
require('./local/passport').setup(User, config);

router.use('/local', require('./local'));

module.exports = router;