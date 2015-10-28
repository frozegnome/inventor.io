'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  type: String,
  info: String,
  quantity: Number,
  isStocked: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);