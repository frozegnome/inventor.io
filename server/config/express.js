'use strict';

var express = require('express'),
	favicon = require('serve-favicon'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	passport = require('passport'),
	errorHandler = require('error-handler'),
	config = require('./environment');

module.exports = function(app) {
	var env = app.get('env');

	app.set('views', config.root + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(passport.initialize());

	if ('production' === env) {
		app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
		app.use(express.static(path.join()));
		app.set('appPath', path.join(config.root, 'public'));
	}

	if ('development' === env || 'test' === env) {
		app.use(require('connect-livereload')());
		app.use(express.static(path.join(config.root, '.tmp')));
		app.use(express.static(path.join(config.root, 'client')));
		app.set('appPath', path.join(config.root, 'client'));
		app.use(errorHandler);
	}
};