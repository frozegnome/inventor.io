'use strict';

var mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  ItemModel = new Schema({
		  name: String,
		  quantity: Number
	  });

module.exports = mongoose.model('Item', ItemModel);