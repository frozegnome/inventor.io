'use strict';

var mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  ItemSchema = new Schema({
		  name: String,
		  quantity: Number
	  });

module.exports = mongoose.model('Item', ItemSchema);