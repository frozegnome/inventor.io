'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  quantity: Number,
  isActive: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);