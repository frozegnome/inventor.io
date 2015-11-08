/* 

API Reference

GET		  /items		  (index)
POST	  /items		  (create)
GET 	  /items/:id	(show)
PUT		  /items/:id	(update)
DELETE	/items/:id	(destroy)

*/

'use strict';

var Item = require('./item.model'),
	  _ = require('lodash');


// Error Handling
var errorHandler = function(res, err) {
	return res.status(500).send(err);
};

// Get all Items from the Database
exports.index = function(req, res) {
	Item.find(function(err, items) {
		if(err) {
			return errorHandler(res, err);
		}
		return res.status(200).json(items);
	});
};

// Create a new Item in the Database
exports.create = function(req, res) {
	Item.create(req.body, function(err, item) {
		if(err) {
			return errorHandler(res, err);
		}
		if(!item) {
			return res.status(404).send('Item Not Found');
		}
		return res.status(201).json(item);
	});
};

// Get a single Item from the Database
exports.show = function(req, res) {
	Item.findById(function(err, item) {
		if(err) {
			return errorHandler(res, err);
		}
		if(!item) {
			return res.status(404).send('Item Not Found');
		}
		return res.status(200).json(item);
	});
};

// Update an Item in the Database
exports.update = function(req, res) {
	if(req.body._id) {
		delete req.body._id;
	}
	Item.findById(function(err, item) {
		if(err) {
			return errorHandler(res, err);
		}
		if(!item) {
			return res.status(404).send('Item Not Found');
		}
		var updatedItem = _.merge(item, req.body);
		updatedItem.save(function(err) {
			if(err) {
				return errorHandler(res, err);
			}
			return res.status(200).json(item);
		});
	});
};

// Destroy an Item in the Database
exports.destroy = function(req, res) {
	Item.findById(req.params.id, function(err, item) {
		if(err) {
			return errorHandler(res, err);
		}
		if(!item) {
			return res.status(404).send('Item Not Found');
		}
		item.remove(function(err) {
			if(err) {
				return errorHandler(res, err);
			}
			return res.status(204).send('No Content');
		});
	});
};
